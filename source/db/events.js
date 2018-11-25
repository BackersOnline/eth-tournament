const bookshelf = require('./base');

const Events = bookshelf.Model.extend({
  tableName: 'events'
});

module.exports = Events;
