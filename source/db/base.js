const knex = require('knex')({
  client: 'postgres',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  }
});
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
