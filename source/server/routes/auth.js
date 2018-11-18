const registerController = require('../controllers/auth/register');
const { checkSchema } = require('express-validator/check');
const { registerSchema } = require('../lib/validations');

const authRoutes = (app) => {
  app.post('/auth/signup', checkSchema(registerSchema), registerController);
};

module.exports = authRoutes;
