const bookshelf = require('./base');

const Sessions = bookshelf.Model.extend({
  tableName: 'sessions',
  hidden: 'id'
});

module.exports = Sessions;
