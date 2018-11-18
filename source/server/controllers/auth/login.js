const Users = require('../../../db/users');
const Sessions = require('../../../db/sessions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');
const email = require('../../lib/email');

const TWENTY_DAYS = 1728000;

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const user = email.validate(req.body.username) ?
      await Users.forge({ email: req.body.email }).fetch() :
      await Users.forge({ username: req.body.username }).fetch();
    if (user == null) {
      throw new Error('invalid_credentials');
    }
    const isValid = await bcrypt.compare(String(req.body.password), user.get('password'));
    if (!isValid) {
      throw new Error('invalid_credentials');
    }
    const token = jwt.sign({ id: user.get('id') }, process.env.SECRET, {
      expiresIn: TWENTY_DAYS
    });
    const session = await Sessions.forge({ user_id: user.get('id') }).fetch();
    await session.set('token', token);
    await session.set('expires_on', new Date(Date.now() + (TWENTY_DAYS * 1000)));
    await session.set('last_active', new Date());
    await session.save();
    return res
      .status(200)
      .cookie('token', session.get('token'), {
        expires: new Date(Date.now() + (TWENTY_DAYS * 1000)),
        httpOnly: false
      })
      .json({
        token: session.get('token'),
        username: user.get('username'),
        email: user.get('email'),
        first_name: user.get('first_name'),
        last_name: user.get('last_name')
      });
  } catch (err) {
    console.error(err);
    if (err.message.includes('invalid_credentials')) {
      return res.status(401).send(err.message);
    }
    return res.status(500).json(err);
  }
};

module.exports = login;

