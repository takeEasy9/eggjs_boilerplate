const {freeze} = require('./objectUtil.js')

const constantUtil = {
    // 枚举值
    STATUS: {
        // 1-有效
        STATUS_VALID: '1',
        // 2-无效
        STATUS_INVALID: '2',
      },
      
      STOCK_STATUS: {
        // 1-上市
        STOCK_STATUS_LIST: '1'
      },
      
    // 同步标识
     MARKET_DATA_SYNC_FLAG: {
        YES: '1',
        NO: '2',
    },

    // 运行环境
    ENV: {
      DEV: 'dev',
      TEST: 'test',
      PROD: 'prod'
    },

    // 时段
    FIRST_HALF_START_TIME: '09:30:00',
    FIRST_HALF_END_TIME: '11:30:00',
    LENIENT_FIRST_HALF_END_TIME: '11:31:00',
    SECOND_HALF_START_TIME: '13:00:00',
    SECOND_HALF_END_TIME: '15:00:00',
    LENIENT_SECOND_HALF_END_TIME: '15:01:00',
    ACTUAL_FIRST_HALF_END_TIME: '11:29:00',
    ACTUAL_SECODE_HALF_END_TIME: '14:59:00',
    DESCEND_FILL_FIRST_START_TIME: '11:25:00',
    DESCEND_FILL_SECOND_START_TIME: '14:55:00',
    FIRST_HALF_SYNC_START_TIME: '09:29:30',
    FIRST_HALF_SYNC_END_TIME: '11:29:30',
    SECOND_HALF_SYNC_START_TIME: '12:59:30',
    SECOND_HALF_SYNC_END_TIME: '14:59:30',
    FIRST_HALF_SECURITY_PRICE_END_TIME: '11:45:00',
    SECOND_HALF_SECURITY_PRICE_END_TIME: '15:15:00',
    // 时间常量
    EXPIRE_SECONDE: 6 * 3600,
    ONE_MINUTE_MILLISCOND: 60 * 1000,
    ONE_HOURE_IN_SCOND: 3600,
    // 数值常量
    FLOAT_FIXED: 4,
    // 股票 手 股 转换单位
    STOCK_UNIT_LOTS: 100,
    PERCENT_UNIT: 100,
    DOUBLE_ZERO: 0.0,
    // 默认汇率
    DEFAULT_MARKET_EXCHANGE_RATE: 1.0,

    // 日期格式
    DATE_FORMART: 'YYYY-MM-DD',
    TIME_FORMART: 'HH:mm:ss',
    DATE_TIME_FORMART: 'YYYY-MM-DD HH:mm:ss',

    // redis key
    MARKET_DATA_SYNC_FLAG_REDIS_KEY: 'marketDataSync:config:marketDataSyncFLag:',
    SUBSCRIBE_STOCK_CODE_REDIS_KEY: 'marketDataSync:subscribeMarketDataStockCode:',
    SUBSCRIBE_STOCK_INDEX_CODE_REDIS_KEY: 'marketDataSync:subscribeMarketDataStockIndexCode:',
    HAVE_MARKET_DATA_STOCK_CODE_REDIS_KEY: 'haveMarketDataStockCode:',
    HAVE_MARKET_DATA_STOCK_INDEX_CODE_REDIS_KEY: 'haveMarketDataStockIndexCode:',
    // 个股上场数据 上场时间unix 时间戳
    STOCK_FINANCIAL_INDICATOR_CREATED_AT_REDIS_KEY: 'marketDataSync:stockFinancialIndicator:createdAt:',
    // 行业(主题)上场数据 上场时间unix 时间戳
    SECURITY_FINANCIAL_INDICATOR_CREATED_AT_REDIS_KEY: 'marketDataSync:securityFinancialIndicator:createdAt:',
    MARKET_DATA_DETAIL_MINUTE_REDIS_KEY: 'marketDataSync:marketDataDetailMinute:',
    TRADE_DATE_FLAG_REDIS_KEY: 'marketDataSync:tradeDateFlag:',
    // websocket 在正常交易时间段断开后是否重试，1-是, 2-否
    MARKET_DATA_WEBSOCKET_RECONNECT_FLAG_REDIS_KEY: 'marketDataSync:config:reconnectFLag:',

    // clickhouse 表名
    STOCK_PRICE_SECOND: 'stock_price_second',
    STOCK_PRICE_MINUTE: 'stock_price_minute',
    INDEX_PRICE_SECOND: 'index_price_second',
    INDEX_PRICE_MINUTE: 'index_price_minute',
    MARKET_DATA_BASIC_MINUTE: 'market_data_basic_minute',
    MARKET_DATA_DETAIL_MINUTE: 'market_data_detail_minute',
    SECURITY_PRICE_SECOND: 'security_price_second',
    SECURITY_PRICE_MINUTE: 'security_price_minute',
    STOCK_FINANCIAL_INDICATOR: 'stock_financial_indicator',
    SECURITY_FINANCIAL_INDICATOR: 'security_financial_indicator',

    // 秒级范围查询条件
    PRICE_SECOND_QUERY_RANGE: 'AND trade_date = {tradeDate: Date} AND trade_time_second >= {startTradeTimeMinute: DateTime} AND trade_time_second < {endTradeTimeMinute: DateTime}) ORDER BY trade_time_second DESC LIMIT 1',
    // sql拼接需要转换类型的列集合
    CONVERT_TO_STRING_SET: new Set(['trade_date', 'trade_time', 'trade_time_minute', 'trade_time_second', 'stock_code', 'security_code', 'change_date']),
    // 常用查询列
    PRICE_SECOND_COLUMNS: 'trade_time_minute, trade_time_second, volume, amount',
    INDEX_PRICE_SECOND_FULL_COLIMNS: 'trade_date, trade_time_minute, trade_time_second, security_code, open_price, highest_price, lowest_price, latest_price, avg_price, volume, amount, sell_volume, buy_volume, volume_ratio, committee, commission_diff, turnover_ratio, pre_close_price, upper_limit_price, lower_limit_price, change_value, change_ratio, earnings_per_share, book_value_per_share, rate_of_return_on_equity, debt_to_asset_ratio, total_shares, flow_a_shares, total_market_value, flow_market_value, swing, pb, pe_ttm, pe_leading, pe_trailing, latest_volume, latest_amount, latest_trade_price, rise_day_count, change_ratio_year',
    STOCK_PRICE_SECOND_FULL_COLIMNS: 'trade_date, trade_time_minute, trade_time_second, stock_code, open_price, highest_price, lowest_price, latest_price, avg_price, volume, amount, sell_volume, buy_volume, volume_ratio, committee, commission_diff, turnover_ratio, pre_close_price, upper_limit_price, lower_limit_price, change_value, change_ratio, earnings_per_share, book_value_per_share, rate_of_return_on_equity, debt_to_asset_ratio, total_shares, flow_a_shares, total_market_value, flow_market_value, swing, pb, pe_ttm, pe_leading, pe_trailing, latest_volume, latest_amount, latest_trade_price, rise_day_count, change_ratio_year, ask_price1, ask_price2, ask_price3, ask_price4, ask_price5, ask_volume1, ask_volume2, ask_volume3, ask_volume4, ask_volume5, bid_price1, bid_price2, bid_price3, bid_price4, bid_price5, bid_volume1, bid_volume2, bid_volume3, bid_volume4, bid_volume5',
    COMMON_PRICE_MINUTE_COLUMNS: 'trade_time, trade_date, open_price, highest_price, lowest_price, close_price, avg_price, volume, amount, change_value, change_ratio, turnover_ratio, sell_volume, buy_volume, change_ratio_accumulated',
    STOCK_PRICE_MINUTE_COLUMNS: 'trade_time, trade_date, open_price, highest_price, lowest_price, close_price, avg_price, volume, amount, change_value, change_ratio, turnover_ratio, sell_volume, buy_volume, change_ratio_accumulated, change_value_accumulated, turnover_ratio_accumulated',
    STOCK_FINANCIAL_INDICATOR_COLUMS: 'stock_code, total_share, total_float_share, total_a_share, float_a_share, previous_year_net_profit, latest_four_quarter_net_profit, net_profit_include_min_shareholder, earnings_per_share, book_value_per_share, rate_of_return_on_equity, debt_to_asset_ratio, pre_close_price, upper_limit_price, lower_limit_price, adj_share, rise_day_count, predict_net_profit_exclude_min_shareholder, total_equity_exclude_min_shareholder',
    SECURITY_FINANCIAL_INDICATOR_COLUMS: 'security_code, security_type, total_share, total_float_share, total_a_share, float_a_share, previous_year_net_profit, latest_four_quarter_net_profit, net_profit_exclude_min_shareholder, earnings_per_share, book_value_per_share, rate_of_return_on_equity, debt_to_asset_ratio, pre_close_price, upper_limit_price, lower_limit_price, rise_day_count, total_equity_exclude_min_shareholder',
    MARKET_DATAL_BASIC_MINUTE_COLUMS: 'market_data_code, data_type, change_date, trade_time_minute, trade_time_second, market_base_value, market_original_divisor, market_base_index, market_data_status',
    MARKET_DATAL_DETAIL_MINUTE_COLUMS: 'market_data_code, data_type, content_code, content_weight', 
    SECURITY_STOCK_PRICE_SECOND_COLUMS: 'stock_code, trade_time_second, open_price, highest_price, lowest_price, latest_price, avg_price, volume, amount, sell_volume, buy_volume, ask_price1, ask_price2, ask_price3, ask_price4, ask_price5, ask_volume1, ask_volume2, ask_volume3, ask_volume4, ask_volume5, bid_price1, bid_price2, bid_price3, bid_price4, bid_price5, bid_volume1, bid_volume2, bid_volume3, bid_volume4, bid_volume5',
    // 数据库表与逻辑唯一索引映射
    TABLE_UNIQUE_KEY_MAP: new Map([['stock_price_second', 'stock_code, trade_time_second'],
                                  ['index_price_second', 'security_code, trade_time_second'],
                                  ['security_price_second', 'security_code, trade_time_second'],
                                  ['stock_price_minute', 'stock_code, trade_time'],
                                  ['index_price_minute', 'security_code, trade_time'],
                                  ['security_price_minute', 'security_code, trade_time']]),
    // 默认数据库                              
    DEFAULT_SCHEMA: 'xt',
    // 只读数据, 主要用于获取上场数据
    READONLY_SCHEMA: 'analysis',
    TABLE_SCHEMA_MAP: new Map([['stock_price_second', 'xt'],
                              ['index_price_second', 'xt'],
                              ['security_price_second', 'xt'],
                              ['stock_price_minute', 'xt'],
                              ['index_price_minute', 'xt'],
                              ['security_price_minute', 'xt'],
                              ['stock_financial_indicator', 'analysis'],
                              ['security_financial_indicator', 'analysis'],
                              ['market_data_basic_minute', 'xt'],
                              ['market_data_detail_minute', 'analysis']]),

    // 特殊字符
    SPECIAL_CHARACTER_EMPTY: '',
    SPECIAL_CHARACTER_UNDERLINE: '_',
    SPECIAL_CHARACTER_SPACE: ' ',
    SPECIAL_CHARACTER_HYPHEN: '-',
    SPECIAL_CHARACTER_ELLIPSISM: '...',
    SPECIAL_CHARACTER_COMMA: ',',
    SPECIAL_CHARACTER_COLON: ':',
    // 接口响应
    START_SYNC_IS_RUNNING: {code: 'D0106', msg: '正在同步数据, 无需重复启动'},
    START_SYNC_SUCCESS: {code: 'D0107', msg: '启动数据同步成功'},
    START_SYNC_FAILED: {code: 'D0108', msg: '启动数据同步失败'},
    START_SYNC_NOT_TRADE_DATE: {code: 'D0108', msg: '当前日期非交易日期, 无需启动同步'},
    START_SYNC_NOT_IN_SYNC_TIME_RANGE: {code: 'D0108', msg: '当前时间不在交易时间段内, 无法启动同步'},
    STOP_SYNC_SUCCESS: {code: 'D0110', msg: '停止同步成功'},
    STOP_SYNC_NO_NEED: {code: 'D0110', msg: '同步数据未启动, 无需停止'},
    STOP_SYNC_FAILED: {code: 'D0111', msg: '停止同步失败'},
    SYNC_STATUS_RUNNING: {code: 'D0200', msg: '同步正在运行'},
    SYNC_STATUS_STOP: {code: 'D0201', msg: '同步已停止运行'},
    MARKET_DATA_SYNC_FAILED: {code: 'C0211', msg: '数据同步失败'},


    // 其它自动服务监控
    AUTO_SERVICE_START: {code: 'D0106', msg:"服务已启动,无需重复启动!"},
    AUTO_SERVICE_START_SUCCESS: {code: 'D0107', msg:"服务启动成功!"},
    AUTO_SERVICE_START_FAILED: {code: 'D0108', msg:"服务启动失败!"},
    AUTO_SERVICE_STOP: {code: 'D0109', msg:"服务已停止,无需重复停止!"},
    AUTO_SERVICE_STOP_SUCCESS: {code: 'D0110', msg:"服务停止成功!"},
    AUTO_SERVICE_STOP_FAILED: {code: 'D0111', msg:"服务停止失败!"},
    // 服务状态监控，接口响应
    SERVICE_STATUS_ACTIVE: {code: 'D0200', msg: '服务运行正常!' },
    SERVICE_STATUS_INACTIVE: {code: 'D0201', msg: '服务停止运行!' },
    SERVICE_STATUS_UNKNOWN: {code: 'D0202', msg: '无法获取服务状态,请检查服务!' },
    SERVICE_STATUS_OFFLINE: {code: 'D0203', msg: '服务已下线,请检查!' },

    // 短信接口
    SHORT_MESSAGE_API: 'http://localhost:8084/api/message/send',
    SHORT_MESSAGE_CONTENT_BOUND: 128,
    SHORT_MESSAGE_SEND_SUCCESS : {code: 'C0000', msg: '短信发送成功'},
    SHORT_MESSAGE_SEND_FAILED: {code: 'C0001', msg: '短信发送失败'},

}

freeze(constantUtil)
module.exports = constantUtil