'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
const Controller = require('egg').Controller;
const {startSchedule, stopSchedule, getScheduleStatus} = require('../util/scheduleUtil.js')
const SCHEDULE_NAME = 'exampleSchedule'

class ExampleScheduleController extends Controller {

    async getScheduleStatus(){
        this.app.logger.info("REST 定时同步任务状态")
        this.ctx.body = getScheduleStatus(this.app, SCHEDULE_NAME)
    }

    async startSchedule(){
        this.app.logger.info("REST 启动定时同步任务")
        this.ctx.body = startSchedule(this.app, SCHEDULE_NAME)
    }

    async stopSchedule(){
        this.app.logger.info("REST 定时同步任务")
        this.ctx.body = stopSchedule(this.app, SCHEDULE_NAME)
    }
}
module.exports = ExampleScheduleController;