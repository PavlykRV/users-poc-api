const express = require('express');
const router = express.Router();

const Location = require('../models/location');

async function getLocations() {
  try {
    const locations = await Location.find({}).limit(200).then();
    return locations;
  } catch (error) {
    console.error('Error while fetching locations', error);
  }
}

router.get('/', async (req, res) => {
  const result = await getLocations();

  res.send(result);
});

module.exports = router;
