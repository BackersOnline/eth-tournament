const Users = require('../../../db/users');
const Sessions = require('../../../db/sessions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');

const TWENTY_DAYS = 1728000;

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const hashedPassword = await bcrypt.hash(String(req.body.password), parseInt(process.env.SALT_ROUNDS));
    const userObject = Object.assign({}, req.body, { 
      password: hashedPassword,
      is_verified: false
    });
    const user = await Users.forge(userObject).save();
    const token = jwt.sign({ id: user.get('id') }, process.env.SECRET, {
      expiresIn: TWENTY_DAYS
    });
    const session = await Sessions
      .forge({
        token,
        expires_on: new Date(Date.now() + (TWENTY_DAYS * 1000)),
        user_id: user.get('id'),
        last_active: new Date()
      })
      .save();
    return res
      .status(200)
      .cookie('token', session.get('token'), {
        expires: new Date(Date.now() + (TWENTY_DAYS * 1000)),
        httpOnly: false
      })
      .json({
        token: session.get('token'),
        first_name: user.get('first_name'),
        last_name: user.get('last_name'),
        username: user.get('username'),
        email: user.get('email')
      });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
};

module.exports = register;
