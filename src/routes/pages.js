const express = require('express');
const router = express.Router();

const Page = require('../models/page');

async function getPages() {
  try {
    const pages = await Page.find({}).limit(20).then();
    return pages;
  } catch (error) {
    console.error('Error while fetching pages', error);
  }
}
router.get('/', async (req, res) => {
  const result = await getPages();

  res.send(result);
});

module.exports = router;
