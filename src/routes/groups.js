const express = require('express');
const router = express.Router();

const Group = require('../models/group');

async function getGroups() {
  try {
    const groups = await Group.find({}).limit(50).then();
    return groups;
  } catch (error) {
    console.error('Error while fetching groups', error);
  }
}

router.get('/', async (req, res) => {
  const result = await getGroups();

  res.send(result);
});

module.exports = router;
