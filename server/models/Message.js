const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /[a-zA-Z0-9. ]{3,255}/.test(value),
      message: (props) => `"${props.value}" is bad content`,
    },
  },
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
