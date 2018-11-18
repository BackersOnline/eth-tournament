const Sessions = require('../../db/sessions');
const jwt = require('jsonwebtoken');
const whitelist = require('../lib/pathWhitelist');

const verifyToken = async (req, res, next) => {
  try {
    if (whitelist(req.path)) {
      return next();
    }
    const cookieToken = req.cookies.token;
    if (cookieToken == null) {
      throw new Error('invalid_token');
    }
    const token = await Sessions.forge({ token: cookieToken }).fetch();
    if (token == null || token.get('expires_on') < new Date()) {
      throw new Error('invalid_token');
    }
    req.user = { id: session.get('user_id') };
    return next();
  } catch (err) {
    if (err.message.includes('invalid_token')) {
      return res.status(401).send(err.message);
    } else {
      return res.status(500).json(err);
    }
  }
};

module.exports = verifyToken;
