
exports.up = knex =>
  knex.schema.table('issues', t => {
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex =>
  knex.schema.table('issues', t => {
    t.dropColumns('created_at', 'updated_at');
  });
