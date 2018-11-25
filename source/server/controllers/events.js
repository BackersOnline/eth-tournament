const Events = require('../../db/events');
const { validationResult } = require('express-validator/check');

const create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const eventObject = Object.assign({}, req.body, { organizer_id: req.user.id });
    const event = await Events.forge(eventObject).save();
    return { id: event.get('id') };
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const remove = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const event = await Events
      .forge({
        id: req.params.id,
        organizer_id: req.user.id
      })
      .fetch();
    if (event == null) {
      return res.status(404).send(`Could not find event with id ${req.params.id}`);
    }
    await event.destroy();
    return res.json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  create,
  remove
};
