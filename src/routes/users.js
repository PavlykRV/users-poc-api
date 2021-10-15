const express = require('express');
const router = express.Router();
const validateUser = require('../validators/user');

const User = require('../models/user');

async function getUsers() {
  try {
    const users = await User.find({}).limit(10).then();
    return users;
  } catch (error) {
    console.error('Error while fetching users', error);
  }
}

async function getUser(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error('Error while fetching user', error);
  }
}

async function createUser(data) {
  const isExist = await User.find({ email: data.email }).then();

  if (isExist) {
    return 'User with provided email already exist';
  }

  const user = new User({
    ...data,
  });

  try {
    await user.save();
    return user;
  } catch (error) {
    console.error('Cant create new user', error);
  }
}

async function updateUser({ id, data }) {
  console.log('updateUser:', id, data);
  try {
    const user = await User.findById(id);

    if (!user) {
      return null;
    }

    user.set({
      ...data,
    });

    await user.save();
    return user;
  } catch (error) {
    console.error('Error while updating user', error);
  }
}

router.get('/', async (req, res) => {
  console.log('QUERY:', req.query);

  const result = await getUsers();

  if (!result) {
    return res.status(404).send('The users was not found');
  }

  res.send(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await getUser(id);

  if (!result) {
    return res.status(404).send('The user with the given ID was not found');
  }
  res.send(result);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    res.status(400).send(error.details);
    return;
  }

  const result = await createUser(req.body);

  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    res.status(400).send(error.details);
    return;
  }

  const result = await updateUser({
    id: req.params.id,
    data: req.body,
  });

  res.send(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await User.deleteOne({ _id: id });

  res.send(result);
});

module.exports = router;
