const constantUtil = require('../util/constantUtil.js')

function getScheduleByName(app, scheduleName){
    const keys = Object.keys(app.schedules)
    for(let key of keys){
        if(key.indexOf(scheduleName) != -1){
            return app.schedules[key]
        }
    }
}

function startSchedule(app, scheduleName){
    try {
        let targetSchedule = getScheduleByName(app, scheduleName)
        if(targetSchedule){
            if(targetSchedule.schedule.disable){
                app.logger.info('定时任务 %s 已启动, 无需重复启动', scheduleName)
                return constantUtil.AUTO_SERVICE_START
            } else {
                app.logger.info('启动定时任务 %s 成功', scheduleName)
                targetSchedule.schedule.disable = true
                return constantUtil.AUTO_SERVICE_START_SUCCESS
            }
        } else {
            app.logger.error('启动定时任务 %s, 定时任务不存在', scheduleName)
            return constantUtil.AUTO_SERVICE_START_FAILED
        }
        
    } catch(error){
        app.logger.error('启动定时任务 %s 失败, 原因是 %s', scheduleName, error)
        return constantUtil.AUTO_SERVICE_START_FAILED
    }
}

function stopSchedule(app, scheduleName){
    try {
        let targetSchedule = getScheduleByName(app, scheduleName)
        if(targetSchedule){
            if(targetSchedule.schedule.disable){
                app.logger.info('停止定时任务 %s 成功', scheduleName)
                targetSchedule.schedule.disable = false
                return constantUtil.AUTO_SERVICE_STOP_SUCCESS
            } else {
                app.logger.info('定时任务 %s 已停止, 无需重复停止', scheduleName)
                return constantUtil.AUTO_SERVICE_STOP
            }
        } else {
            app.logger.error('停止定时任务 %s, 定时任务不存在', scheduleName)
            return constantUtil.AUTO_SERVICE_STOP_FAILED
        }
        
    } catch(error){
        app.logger.error('停止定时任务 %s 失败, 原因是 %s', scheduleName, error)
        return constantUtil.AUTO_SERVICE_STOP_FAILED
    }
}

function getScheduleStatus(app, scheduleName){
    try {
        let targetSchedule = getScheduleByName(app, scheduleName)
        if(targetSchedule){
            app.logger.info('获取定时任务 %s 状态, 当前定时任务状态(true-正常运行, false-停止运行)为 ', scheduleName, targetSchedule.schedule.disable)
            return targetSchedule.schedule.disable ? constantUtil.SERVICE_STATUS_INACTIVE : constantUtil.SERVICE_STATUS_ACTIVE
        } else {
            app.logger.error('获取定时任务 %s 状态, 该定时任务不存在, ', scheduleName)
            return constantUtil.SERVICE_STATUS_UNKNOWN
        }
        
    } catch(error){
        app.logger.error('获取定时任务 %s 失败, 原因是 %s', scheduleName, error)
        return constantUtil.SERVICE_STATUS_UNKNOWN
    }
}

module.exports = {
    startSchedule,
    stopSchedule,
    getScheduleStatus,
}