'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
    env: ['local', 'dev', 'test', 'prod'],
  },

  redis: {
    enable: true,
    package: 'egg-redis',
    env: ['local', 'dev', 'test', 'prod'],
  },
  
};
