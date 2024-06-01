'use strict'
const Service = require('egg').Service
const { createClient}  = require('@clickhouse/client')
const constantUtil = require('../util/constantUtil.js')
const { getCurrentDate, }  = require('../util/timeUtil.js')
const {isEmpty} = require('../util/collectionUtil.js')
class commonService extends Service {

    // 查询 clickhouse库
    async queryFromClickHouse(table, innerTable, columns, where, queryParams){
        const database = constantUtil.TABLE_SCHEMA_MAP.has(table) ? constantUtil.TABLE_SCHEMA_MAP.get(table) : constantUtil.TABLE_SCHEMA_MAP.get(innerTable)
        try {
          if (!database) {
            this.app.logger.error('clickhouse 数据库表 %s %s对应schema不存在', innerTable)
            return 
          } 
          
          const clickhouseClient = createClient({
            host: this.app.config.clickhouse.host,
            username: this.app.config.clickhouse.username,
            password: this.app.config.clickhouse.password,
            database: database, })
            const resultSet = await clickhouseClient.query({
            query: `SELECT ${columns} FROM ${table} WHERE ${where}`,
            format: 'JSONEachRow',
            query_params: queryParams,
            clickhouse_settings: {
              wait_end_of_query: this.app.config.clickhouse.waitEndOfQuery,
            },
            })
            const result = await resultSet.json()
            await clickhouseClient.close()
            return result
        } catch(error){
          this.app.logger.error('查询 clickhouse 数据库 %s 表 %s 的列 %s 失败, 原因是 %s', database, table, columns, error)
        }
      }

    // 判断clickhouse exce 执行结果
    isClickHouseExecResultCorrect(execResult) {
      return execResult 
            && execResult.statusCode 
            && execResult.statusCode  == '200'
    }

    // 从clickHouse 删除数据
    async deleteFromClickHouse(clickhouseClient, delStatement, database) {
      try {
        // 默认数据库为 xt
        database = database ? database : 'xt'
        if (!clickhouseClient) {
          clickhouseClient = createClient({
            host: this.app.config.clickhouse.host,
            username: this.app.config.clickhouse.username,
            password: this.app.config.clickhouse.password,
            database: database, })
        }
        if (!delStatement || !/^ALTER TABLE .*? delete WHERE .*?/gi.test(delStatement)) {
          this.app.logger.error('clickhouse 数据库删除语句 %s 不正确, 请检查', delStatement)
          return false
        }
        const execResult = await clickhouseClient.exec({
          query: delStatement,
          clickhouse_settings: {
            wait_end_of_query: this.app.config.clickhouse.waitEndOfQuery,
          },
        })
        if (this.isClickHouseExecResultCorrect(execResult)) {
          this.app.logger.info('tip message: 执行 clickhouse 数据库删除语句 %s 执行成功', delStatement)
          return true
        } else {
          this.app.logger.error('执行 clickhouse 数据库删除语句 %s 执行失败, 返回结果为 %s', delStatement, execResult)
          return false
        }
      } catch (error) {
        this.app.logger.error('执行 clickhouse 数据库删除语句 %s 失败, 原因是 %s', delStatement, error)
        return false
      }
    }

    async sendShortMessage(message) {
        try {
          if (!message) {
            this.app.logger.error('待发送短信内容为空, 无法调用短信服务')
            return false
          }
          // 非生产环境 无需发送告警短信
          if (constantUtil.ENV.PROD != this.app.config.env) {
            return true
          }
          let shortMessage
          if (message.length > constantUtil.SHORT_MESSAGE_CONTENT_BOUND) {
            shortMessage = message.slice(0, constantUtil.SHORT_MESSAGE_CONTENT_BOUND) + constantUtil.SPECIAL_CHARACTER_ELLIPSISM;
          } else {
            shortMessage = message
          }
          // 发送告警短信
          const result = await this.app.curl(constantUtil.SHORT_MESSAGE_API, {
          method: 'POST',
          contentType: 'json',
          data: {
                  content: shortMessage,
                  mobiles: this.app.config.marketDataSyncConfig.credentials,
                },
          dataType: 'json',
          // 30 秒超时
          timeout: 30000,
          })
  
        if (!result 
            || !result.data 
            || !result.data.code 
            || result.data.code != constantUtil.SHORT_MESSAGE_SEND_SUCCESS.code) {
            this.app.logger.error('短信服务调用失败,原因是: %s', error)
            return false
          } else {
            this.app.logger.info('tip message: 短信服务调用成功')
            return true
          }
        } catch(error) {
          this.app.logger.error('发送短信失败, 原因是: %s', error)
          return  false
        }
      }


}

module.exports = commonService