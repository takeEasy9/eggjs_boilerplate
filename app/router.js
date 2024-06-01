// app/router.js
module.exports = (app) => {
    const { router, controller } = app;
    router.get('/api/eggjs/queryFlag', controller.exampleController.queryFlag);
    // 定时任务接口
    router.get('/api/eggjs/status', controller.exampleScheduleController.getScheduleStatus);
    router.get('/api/eggjs/start', controller.exampleScheduleController.startSchedule);
    router.get('/api/eggjs/stop', controller.exampleScheduleController.stopSchedule);

  };