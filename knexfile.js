const development = require('./config/config.js').development;
const production = require('./config/config.js').production;

module.exports = {
  local: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'postgres',
      database: 'taskmanagement'
    }
  },

  development: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host: development.host,
      user: development.username,
      password: development.password,
      database: development.database
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: production.host,
      user: production.username,
      password: production.password,
      database: production.database
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
