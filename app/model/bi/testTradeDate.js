'use strict';
const constantUtil = require('../../util/constantUtil.js')
/**
 * @param {Egg.Application} app - egg application
 */
 module.exports = app => {
    const { DATEONLY, BOOLEAN, Op} = app.Sequelize;
  
    const TestTradeDate = app.model.bi.define('test_trade_date', {
        date: {
        type: DATEONLY,
        primaryKey: true,
      },
      // 交易日标识,0-否,1-是
      is_open: BOOLEAN,
      p_start: DATEONLY,
      p_end: DATEONLY,
      w_start: DATEONLY,
      w_end: DATEONLY,
      n_start: DATEONLY,
      n_end: DATEONLY,
    }, {
      timestamps: false
    });

    TestTradeDate.previousTradeDate = async function(params) {
      app.logger.info('tip message: 判断日期 %s 是否是交易日', params.date)
      const tradeDate = await this.findAll({
          where: { date: {[Op.lt]: params.date}},
          order: ['date', 'DESC'],
          limit: 1})
        return tradeDate.date
    }
  
    TestTradeDate.isTradeDate = async function(params) {
      const haveTradeDateCache = await app.redis.exists(constantUtil.TRADE_DATE_FLAG_REDIS_KEY)
      if(haveTradeDateCache){
        const tradeDateFlag = await app.redis.get(constantUtil.TRADE_DATE_FLAG_REDIS_KEY)
        return tradeDateFlag == 'true'
      } else {
        app.logger.info('tip message: 判断日期 %s 是否是交易日', params.date)
        const tradeDate = await this.findOne({ where: { date: params.date} })
        if (tradeDate) {
          await app.redis.set(constantUtil.TRADE_DATE_FLAG_REDIS_KEY, tradeDate.is_open)
          await app.redis.expire(constantUtil.TRADE_DATE_FLAG_REDIS_KEY, constantUtil.EXPIRE_SECONDE)
          return tradeDate.is_open
        } else {
          app.logger.error('error message: 日期 %s 在交易日历表中不存在, 无法判断是否是交易日', params.date)
          return true
        }
      }
       
    };
    return TestTradeDate;
  };