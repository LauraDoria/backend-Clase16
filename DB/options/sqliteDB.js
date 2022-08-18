const optionsSqlite = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: '../sqliteDB/sqlite.db3'
    }
  })

  module.exports = {optionsSqlite}