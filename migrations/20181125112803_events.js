exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events', function (table) {
      table.increments('id').primary().notNullable();
      table.integer('organizer_id').notNullable();
      table.string('title').notNullable();
      table.bool('public').notNullable();
      table.timestamp('start_date').notNullable();
      table.timestamp('end_date').notNullable();
      table.string('address').notNullable();
      table.string('location').notNullable();
      table.string('terms').notNullable();
      // Ensure event titles are unique
      table.unique(['title']);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('events')
  ]);
};
