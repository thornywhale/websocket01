const express = require('express');
const cors = require('cors');
const app = express();

const { createOrFindUser } = require('./controllers/users.controller');
const { getAllMessages } = require('./controllers/messages.controller');

app.use(cors());
app.use(express.json());

app.get('/', getAllMessages);
app.post('/users', createOrFindUser);

app.use((err, req, res, next) => {
  // console.log('ERROR---------------------------', err);
  res.status(500).send({ errors: [err] });
});

module.exports = app;
