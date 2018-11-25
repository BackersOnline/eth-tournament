const eventsController = require('../controllers/events');
const { checkSchema } = require('express-validator/check');
const { eventSchema, deleteEventSchema } = require('../lib/validations');

const eventRoutes = (app) => {
  app.post('/event', checkSchema(eventSchema), eventsController.create);
  app.delete('/event/:id', checkSchema(deleteEventSchema), eventsController.remove);
};

module.exports = eventRoutes;
