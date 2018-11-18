const whitelist = [
  '/auth/signup',
  '/auth/login'
];

const skipHeaderCheck = (path) => {
  return whitelist.includes(path);
};

module.exports = skipHeaderCheck;
