const registerSchema = {
  username: {
    in: ['body'],
    isString: true,
    optional: false,
    errorMessage: 'username is required and must be a string'
  },
  email: {
    in: ['body'],
    isEmail: true,
    optional: false,
    errorMessage: 'email is required and must be a valid email address'
  },
  password: {
    in: ['body'],
    isString: true,
    optional: false,
    errorMessage: 'password is required'
  },
  first_name: {
    in: ['body'],
    isString: true,
    optional: false,
    errorMessage: 'first_name is required'
  },
  last_name: {
    in: ['body'],
    isString: true,
    optional: false,
    errorMessage: 'last_name is required'
  }
};

module.exports = {
  registerSchema
};
