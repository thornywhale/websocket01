const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config =
  require('../configs/mongo')[process.env.NODE_ENV || 'development'];

mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.dbName}`)
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const currentFileName = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter((fileName) => /\.js$/.test(fileName) && fileName !== currentFileName)
  .forEach((fileName) => {
    const Model = require(path.resolve(__dirname, fileName));
    db[Model.modelName] = Model;
  });

module.exports = db;
