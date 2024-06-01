'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
 module.exports = app => {
    const { STRING, BIGINT, INTEGER, DATE, DECIMAL } = app.Sequelize;
  
    const StockBasic = app.model.analysis.define('stock_basic', {
      id: {
        type: BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      stock_code: STRING(9),
      stock_name: STRING(24),
      stock_cn_name: STRING(255),
      stock_en_name: STRING(255),
      stock_pinyin: STRING(40),
      stock_isin_code: STRING(40),
      exchange_market: STRING(3),
      list_board_type: STRING(2),
      list_date: STRING(8),
      delist_date: STRING(8),
      province: STRING(255),
      city: STRING(255),
      legal_person: STRING(255),
      chairman: STRING(38),
      president: STRING(38),
      board_secretary: STRING(38),
      registered_capital: DECIMAL(20, 4),
      found_date: STRING(8),
      chinese_introduction: STRING(2000),
      web_site: STRING(80),
      email: STRING(80),
      office_address: STRING(200),
      business_scope: STRING(4000),
      main_business: STRING(1000),
      wind_company_id: STRING(64),
      credit_company_id: BIGINT,
      stock_type: STRING(2),
      stock_connect_type: STRING(1),
      employee_count: INTEGER,
      vie_flag: STRING(1),
      profit_flag: STRING(1),
      leading_flag: STRING(1),
      csi500_flag: STRING(1),
      csi300_flag: STRING(1),
      sse50_flag: STRING(1),
      star50_flag: STRING(1),
      stock_status: STRING(1),
      list_region_type: STRING(1),
      created_by: STRING(50),
      created_date: DATE,
      last_modified_by: STRING(50),
      last_modified_date: DATE,
    }, {
      timestamps: false
    });
  
    StockBasic.findByStockStatus = async function(params) {
      app.logger.info('tip message: 通过个股状态 %s 查询个股基础信息', params)
      return await this.findAll({ attributes: ['stock_code', 'stock_name'],
       where: { stock_status: params.stockStatus} });
    };
    return StockBasic;
  };