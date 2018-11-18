const registerController = require('../controllers/auth/register');
const loginController = require('../controllers/auth/login');
const { checkSchema } = require('express-validator/check');
const { registerSchema, loginSchema } = require('../lib/validations');

const authRoutes = (app) => {
  app.post('/auth/signup', checkSchema(registerSchema), registerController);
  app.post('/auth/login', checkSchema(loginSchema), loginController);
};

module.exports = authRoutes;
