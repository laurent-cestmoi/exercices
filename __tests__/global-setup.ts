
import { dbManager } from '../src/config/knex-db-manager'
// const dbManager = require('knex-db-manager').databaseManagerFactory(
//     dbManagerConfig
//   )

// Suppression de la bdd si elle existe puis création
module.exports = async function createTestDatabase() {
  try {
    // await knex.raw(`DROP DATABASE IF EXISTS ${database}`)
    console.info('')
    console.info('')
    console.info('Supprime la base de données…')
    //await dbManager.dropDb(dbManagerConfig.knex.connection.database)
    await dbManager.dropDb()
    console.info('Base de données supprimée')

    console.info('')
    console.info('Crée la base de données…')
    //await dbManager.createDb(dbManagerConfig.knex.connection.database)
    await dbManager.createDb()
    console.info('Base de données créée')
    
    console.info('')
    console.info('Création de la structure de la base de données…')
    await dbManager.migrateDb()
    console.info('Structure de la base de données créée')

    console.info('')
    //process.exit()

   } catch (error) {
     console.log(error)
     process.exit(1)
   }
 }

// Création du schéma de la bdd (puis alimentation... plus tard)
// module.exports = async function seedTestDatabase() {
//   try {
//     //await knex.migrate.latest()
//     //await knex.seed.run()
//     await dbManager.migrateDb()
//   } catch (error) {
//     throw new Error(error)
//   } finally {
//     //await knex.destroy()
//   }
// }