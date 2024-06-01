const Subscription = require('egg').Subscription

class scheduleExample extends Subscription {
    static get schedule() {
        return {
          // 周一至周五 9点28分50秒运行一次
          cron: '50 28 9 * * 1-5', 
          type: 'worker',
          disable: false,
        };
      
    }
    async subscribe() {
        // do something
    }

}

module.exports = scheduleExample;