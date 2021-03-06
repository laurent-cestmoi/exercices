const { join } = require('path')
require('dotenv').config({ path: join(__dirname, '..', '.env') })

//const { knexSnakeCaseMappers } = require('objection')

const connection = {
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
}

const knexConfig = {
  client: 'pg',
  connection,
  migrations: {
    directory: join(__dirname, 'migrations')
  },
  seeds: {
    directory: join(__dirname, './seeds')
  }//,
 // ...knexSnakeCaseMappers()
}

module.exports = { knexConfig, connection };
