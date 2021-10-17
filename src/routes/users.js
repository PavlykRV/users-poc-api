const express = require('express');
const router = express.Router();
const validateUser = require('../validators/user');

const User = require('../models/user');
const Location = require('../models/location');
const Group = require('../models/group');
const Page = require('../models/page');

async function getUsers({ items, page, search }) {
  console.log('getUsers:', items, page, search);
  const pattern = new RegExp(`.*${search}.*`, 'i');
  console.log('PATTERN', pattern);
  try {
    const users = await User.find()
      .or([{ firstName: pattern }, { lastName: pattern }])
      .skip((parseInt(page) - 1) * parseInt(items))
      .limit(parseInt(items))
      .then();
    const total = await User.find().count().then();
    console.log('USERS', users.length);
    return {
      users,
      total,
    };
  } catch (error) {
    console.error('Error while fetching users', error);
  }
}

async function getLocations() {
  try {
    const locations = await Location.find({}).limit(200).then();
    return locations;
  } catch (error) {
    console.error('Error while fetching locations', error);
  }
}

async function getGroups() {
  try {
    const groups = await Group.find({}).limit(50).then();
    return groups;
  } catch (error) {
    console.error('Error while fetching groups', error);
  }
}

async function getPages() {
  try {
    const pages = await Page.find({}).limit(20).then();
    return pages;
  } catch (error) {
    console.error('Error while fetching pages', error);
  }
}

async function updateUsers() {
  try {
    const users = await getUsers();
    const locations = await getLocations();
    const groups = await getGroups();
    const pages = await getPages();

    const getLocationIndex = () => Math.round(Math.random() * locations.length);
    const getGroupIndex = () => Math.round(Math.random() * groups.length);
    const getPageIndex = () => Math.round(Math.random() * pages.length);

    users.forEach(async ({ _id }) => {
      const locationsQty = Math.round(Math.random() * 10);
      const groupQty = Math.round(Math.random() * 5);
      const pageQty = Math.round(Math.random() * pages.length);

      let newLocations = [];
      let newGroups = [];
      let newPages = [];
      for (let i = 0; i <= locationsQty; i++) {
        const country = locations[getLocationIndex()];
        if (!newLocations.includes(country)) {
          newLocations.push(country);
        } else {
          newLocations.push(locations[getLocationIndex()]);
        }
      }

      for (let i = 0; i <= groupQty; i++) {
        const group = groups[getGroupIndex()];
        if (!newGroups.includes(group)) {
          newGroups.push(group);
        } else {
          newGroups.push(locations[getGroupIndex()]);
        }
      }

      for (let i = 0; i <= pageQty; i++) {
        const page = pages[getPageIndex()];
        if (!newPages.includes(page)) {
          newPages.push(page);
        } else {
          newPages.push(pages[getGroupIndex()]);
        }
      }
      const user = await User.findById(_id);
      user.set({
        locations: newLocations,
        groups: newGroups,
        accessPages: newPages,
      });
      const result = await user.save();
    });
  } catch (error) {
    console.error('Error while fetching groups', error);
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
  const { items, page, search } = req.query;
  const result = await getUsers({ items, page, search });

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
  console.log('req.body:', req.body);
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
