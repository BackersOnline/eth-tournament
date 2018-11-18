exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary().notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('bio');
      table.string('username').notNullable();
      table.integer('wins');
      table.integer('games_played');
      table.bool('is_verified').notNullable();
      // Ensure not to save duplicate accounts with the same email or username
      table.unique(['email', 'username']);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
