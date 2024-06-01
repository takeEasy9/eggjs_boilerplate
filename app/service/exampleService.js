'use strict'

const Service = require('egg').Service
const { createClient}  = require('@clickhouse/client')
const constantUtil = require('../util/constantUtil.js')
const {isEmpty, } = require('../util/collectionUtil.js')
const {stopSchedule} = require('../util/scheduleUtil.js')

class ExampleService extends Service {

    async isMarketDataSyncRunning(){
      try {
        const syncFlag = await this.app.redis.get(constantUtil.MARKET_DATA_SYNC_FLAG_REDIS_KEY)
        this.marketDataSyncFlag = syncFlag == constantUtil.MARKET_DATA_SYNC_FLAG.YES
        return this.marketDataSyncFlag
      } catch(error){
        this.app.logger.error('从redis中获取<同步标识>失败, 原因是 %s', error)
        return true
      }
    }
    
    // 拼接 sql
    generateInsertSql(data){
      if(!data){
        return constantUtil.SPECIAL_CHARACTER_EMPTY
      }
      let columns = '(id'
      let values = '(generateUUIDv4()'
      for(let key in data){
        columns += `, ${key}`
        let val = data[key] ? data[key]: constantUtil.DOUBLE_ZERO
        if(constantUtil.CONVERT_TO_STRING_SET.has(key)){
          values += `, '${val}'`
        } else {
          values += `, ${val}`
        }
      }
      columns = columns + ')'
      values = values + ')'
      return {columns: columns, values: values}
    }

    // click数据入库
    async saveToClickHouse(savedDataKeySet, marketDataMap, table){
      try {
        if (isEmpty(marketDataMap)) {
          return true
        }
        this.defaultClickhouseClient = createClient({
          host: this.app.config.clickhouse.host,
          username: this.app.config.clickhouse.username,
          password: this.app.config.clickhouse.password,
          database: this.app.config.clickhouse.defaultDatabase, })
        const schema = constantUtil.TABLE_SCHEMA_MAP.has(table) ? constantUtil.TABLE_SCHEMA_MAP.get(table) : constantUtil.DEFAULT_SCHEMA
        const size = marketDataMap.size
        // 第一条数据
        const firstPriceDataKey = marketDataMap.keys().next().value
        const firstPriceData = marketDataMap.get(firstPriceDataKey)
        // 拼接 sql
        let columnsValuesObj = this.generateInsertSql(firstPriceData)
        const insertColums = columnsValuesObj.columns
        let insertValues = columnsValuesObj.values
        marketDataMap.delete(firstPriceDataKey)
        savedDataKeySet.add(firstPriceDataKey)
        const entryIterator = marketDataMap.entries()
        for (let i = 0; i < size; i++) {
          const entry = entryIterator.next().value
          if (entry) {
            columnsValuesObj = this.generateInsertSql(entry[1])
            insertValues += columnsValuesObj.values
            savedDataKeySet.add(entry[0])
          }
        }
        const insertStatement = `INSERT INTO ${schema}.${table} ${insertColums} VALUES ${insertValues}`
        // 保存数据至 clickhouse
        const exceResult = await this.defaultClickhouseClient.exec({
          query: insertStatement,
          clickhouse_settings: {
            wait_end_of_query: this.app.config.clickhouse.waitEndOfQuery,
          },
        })
        
        if (!this.commonService.isClickHouseExecResultCorrect(exceResult)) {
          this.app.logger.error('保存数据到clickHouse数据库 sql %s 执行失败', insertStatement)
          this.commonService.sendMessageRes("批量保存数据到clickHouse数据库的sql执行失败, 请尽快处理")
        }
      } catch(error) {
        this.app.logger.error('保存数据到 %s 失败，原因是 %s', table, error)
      }
    }

    // 查询标识
    async flagQueryApi(){
      try {
        this.app.logger.info("停止数据同步")
        const isRunning = await this.isMarketDataSyncRunning()
        if(isRunning){
          // 停止定时检测任务
          stopSchedule(this.app, 'marketDataSyncHealthSchedule')
          // 设置全局 同步标识
          await this.app.redis.set(constantUtil.MARKET_DATA_SYNC_FLAG_REDIS_KEY, constantUtil.MARKET_DATA_SYNC_FLAG.NO)
          this.app.logger.info('停止数据同步成功')
          return constantUtil.STOP_SYNC_SUCCESS
        } else {
          this.app.logger.info("同步数据未启动, 无需停止")
          return constantUtil.STOP_SYNC_NO_NEED
        }
      } catch(error){
        this.app.logger.error('停止数据同步失败, 原因是 %s', error)
        await this.app.redis.del(constantUtil.MARKET_DATA_SYNC_FLAG_REDIS_KEY)
        return constantUtil.STOP_SYNC_FAILED
      }
    }
  }

  
module.exports = ExampleService