const optionsMariaDB = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: '',
      password: '',
      database: 'ecommerceRawDB'
    }
  })

  module.exports = {optionsMariaDB}