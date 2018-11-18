const bookshelf = require('./base');

const Users = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = Users;
