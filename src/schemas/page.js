const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = pageSchema;
