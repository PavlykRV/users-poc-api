const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const root = require('./src/routes/root');
const users = require('./src/routes/users');
const locations = require('./src/routes/locations');
const groups = require('./src/routes/groups');
const pages = require('./src/routes/pages');

mongoose
  .connect('mongodb://localhost/mongo-poc')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.error('Could not connect to MongoDB...', error));

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use('/', root);
app.use('/api/users', users);
app.use('/api/locations', locations);
app.use('/api/groups', groups);
app.use('/api/pages', pages);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
