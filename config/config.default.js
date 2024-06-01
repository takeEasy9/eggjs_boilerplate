exports.keys = 'c118e819'
// 端口 设置
exports.cluster = {
  listen: {
    path: '',
    hostname: '0.0.0.0',
    port: 8081,
  }
};
// 日志 设置
exports.logger = {
  level: 'INFO',
  encoding: 'utf-8',
  dir: 'logs/eggjs_boilerplate',
};

// 日志插件 egg-logrotator 设置
exports.logrotator = {
  // 日志文件最大值 100 M
  maxFileSize: 100 * 1024 * 1024,
};

exports.sequelize = {
  datasources: [
    {
      delegate: 'model.analysis',
      baseDir: 'model/analysis',
      dialect: 'mysql',
      dialectOptions:{
        charset: 'utf8mb4',
      },
      host: '192.168.96.233',
      port: 3306,
      database: 'analysis',
      username: 'root',
      password: 'your password',
      // 禁止日志输出
      logging: false,
      define: {
        freezeTableName: true,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    },
    {
      delegate: 'model.bi', 
      baseDir: 'model/bi',
      dialect: 'mysql',
      dialectOptions:{
        charset: 'utf8mb4',
      },
      host: '192.168.96.233',
      port: 3306,
      database: 'bi',
      username: 'root',
      password: 'your password',
      // 禁止日志输出
      logging: false,
      define: {
        freezeTableName: true,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    }
  ]  
  }

  exports.redis = {
    client: {
      port: 6379,          
      host: '192.168.96.233',  
      password: 'your password',
      db: 0,
    }
  }

  exports.clickhouse = {
    host: 'http://192.168.96.233:18123',
    username: 'root',
    password: 'root',
    defaultDatabase: 'xt',
    readOnlyDatabase: 'analysis',
    waitEndOfQuery: 100,
  }