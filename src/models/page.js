const mongoose = require('mongoose');
const pageSchema = require('../schemas/page');

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
