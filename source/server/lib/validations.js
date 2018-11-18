const registerSchema = {
  username: {
    in: ['body'],
    isString: true,
    optional: false,
    errorMessage: 'username is required and must be a string',
    isLength: {
      options: { min: 4, max: 20 },
      errorMessage: 'username must be between 4 and 20 characters'
    }
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
    errorMessage: 'password is required',
    isLength: {
      options: { min: 8, max: 70 },
      errorMessage: 'password must be between 8 and 70 characters'
    }
  },
  first_name: {
    in: ['body'],
    isString: true,
    optional: false,
    errorMessage: 'first_name is required',
    isLength: {
      options: { min: 2, max: 30 },
      errorMessage: 'first_name must be between 2 and 30 characters'
    }
  },
  last_name: {
    in: ['body'],
    isString: true,
    optional: false,
    errorMessage: 'last_name is required',
    isLength: {
      options: { min: 2, max: 30 },
      errorMessage: 'last_name must be between 2 and 30 characters'
    }
  }
};

const loginSchema = {
  password: {
    in: ['body'],
    isString: true,
    optional: false,
    errorMessage: 'password is required'
  },
  email: {
    in: ['body'],
    isEmail: true,
    optional: true,
    errorMessage: 'invalid email'
  },
  username: {
    in: ['body'],
    isString: true,
    optional: true,
    errorMessage: 'username must be a string'
  }
};

module.exports = {
  registerSchema,
  loginSchema
};
