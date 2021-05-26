// Update with your config settings.

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './config'

// On ajoute la conversion automatique entre la façon de nommer snakeCase en base de données
// et camelCase dans le code
import { knexSnakeCaseMappers } from 'objection'

//module.exports = {  // J'essaie de remplacer le require 
const knexFile = {    // dans le fichier server.ts par un import !
  development: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: '../../knex/migrations',
    },
    seeds: {
      directory: '../../knex/seeds',
    },
    ...knexSnakeCaseMappers()
  },
  test: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME+'_tests',
      user: DB_USER,
      password: DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds',
    },
    ...knexSnakeCaseMappers()
  },
  production: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds',
    },
    ...knexSnakeCaseMappers()
  },
}

export default knexFile
