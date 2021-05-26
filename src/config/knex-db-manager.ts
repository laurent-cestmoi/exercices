
import { DB_SUPERUSER, DB_SUPERPASSWORD } from './config'
//import Knex from "knex"
import knexFile from "./knexfile"
import knexDbManager from 'knex-db-manager'

import { Model } from 'objection'

// On utilise la conf de test (base de données propre aux tests)
//const knex = Knex(knexFile.test)

const dbManagerConfig = {
  knex: knexFile.test, // On utilise la conf de test (base de données propre aux tests)
  dbManager: {
    superUser: DB_SUPERUSER,
    superPassword: DB_SUPERPASSWORD
  }
}

const dbManager = knexDbManager.databaseManagerFactory(
  dbManagerConfig
)

Model.knex(knexFile.test)

export  {dbManagerConfig, dbManager}
