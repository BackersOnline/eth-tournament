exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sessions', function (table) {
      table.increments('id').primary().notNullable();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('token').notNullable();
      table.timestamp('expires_on').notNullable();
      table.timestamp('last_active');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('sessions')
  ]);
};
