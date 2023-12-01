const { Message } = require('../models');

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().populate({
      path: 'userId',
      select: ['email', 'login'],
    });
    res.status(200).send({ data: messages });
  } catch (error) {
    next(error);
  }
};
