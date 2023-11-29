const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /[a-zA-Z0-9]{3,31}/.test(value),
      message: (props) => `"${props.value}" is bad login`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /[a-zA-Z0-9]{3,31}@gmail\.com/i.test(value),
      message: (props) => `"${props.value}" is bad email`,
    },
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
