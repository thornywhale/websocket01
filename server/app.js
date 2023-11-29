const express = require('express');
const cors = require('cors'); // eslint-disable-next-line
const { Message, User } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).send({ data: messages });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ errors: [err] });
});

module.exports = app;
