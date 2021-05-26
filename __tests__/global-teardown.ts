
import { dbManager } from '../src/config/knex-db-manager'
// const dbManager = require('knex-db-manager').databaseManagerFactory(
//     dbManagerConfig
//   )


module.exports = async () => {
    try {
     // await knex.raw(`DROP DATABASE IF EXISTS ${database}`)

      console.info('')
      console.info("Suppression de la base de données")
      await dbManager.dropDb()
      console.info('Base de données supprimée')

    //  console.info('')
    //  console.info('crée la base de données…')
      await dbManager.close()
    //  await dbManager.createDb(dbManagerConfig.knex.connection.database)
    //  console.info('base de données créée')

     console.info('')
     process.exit()

    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }