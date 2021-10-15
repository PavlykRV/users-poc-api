const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  groups: { type: Array, default: [] },
  locations: { type: Array, default: [] },
  accessPages: { type: Array, default: [] },
  date: { type: Date, default: Date.now },
});

module.exports = userSchema;
