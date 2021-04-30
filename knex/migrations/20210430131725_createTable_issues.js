
exports.up = knex =>
  knex.schema.createTable('issues', table => {
    table.increments('id') // pas la peine d'ajouter .primary();
    table.string('nom').notNullable();
    table.text('url');
  });

exports.down = knex => knex.schema.dropTable('issues');
