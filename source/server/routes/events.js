const eventsController = require('../controllers/events');
const { checkSchema } = require('express-validator/check');
const { eventSchema } = require('../lib/validations');

const eventRoutes = (app) => {
  app.post('/event', checkSchema(eventSchema), eventsController.create);
};

module.exports = eventRoutes;
