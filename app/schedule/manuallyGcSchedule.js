const Subscription = require('egg').Subscription
const { getCurrentDate, }  = require('../util/timeUtil.js')

class ManuallyGcSchedule extends Subscription {
    static get schedule() {
        return {
          // 周一至周五 8点、12点运行
          cron: '0 0 8,12 * * 1-5', 
          type: 'worker',
          disable: true,
        };
      
    }
    // 手动触发垃圾回收
    async subscribe() {
        try {
            const currentDate = getCurrentDate(constantUtil.DATE_FORMART)
            const isTradeDate = await this.ctx.model.bi.TestTradeDate.isTradeDate({date: currentDate})
            if (isTradeDate){
                if (!global.gc) {
                    this.app.logger.error('error message: node --expose-gc 参数未设置, 无法手动触发垃圾回收')
                    return
                }
                global.gc()
                this.app.logger.info('tip message: 手动触发垃圾回收后, 内存使用情况: %s', process.memoryUsage())
            } else {
                this.app.logger.info('tip message: %s 非交易日, 手动触发垃圾回收', currentDate)
            }
            
        } catch (error) {
            this.app.logger.error('error message: 手动触发垃圾回收失败, 原因是:%s', error)
            const commonService = this.ctx.service.commonService
            // 生产环境 发送告警短信
            const errormsg = `星途行情，手动触发垃圾回收失败, 原因是:${error}`
            const sendMessageResult = await commonService.sendShortMessage(`手动触发垃圾回收失败, 原因是:${error}`)
            // 生成 告警基础信息
            await commonService.generateSystemAlarm(sendMessageResult, errormsg)
        }
    }

}

module.exports = ManuallyGcSchedule;