const mongoose = require('mongoose');
const locationSchema = require('../schemas/location');

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
