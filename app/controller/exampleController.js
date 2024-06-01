'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
const Controller = require('egg').Controller;

class ExampleController extends Controller {

    async queryFlag(){
        this.app.logger.info("REST 开始查询标识")
        const response = await this.ctx.service.exampleService.flagQueryApi()
        this.ctx.body = response
    }
}
module.exports = ExampleController;