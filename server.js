const express = require('express');
const app = express();
const mongoose = require('mongoose');

const root = require('./src/routes/root');
const users = require('./src/routes/users');

mongoose
  .connect('mongodb://localhost/mongo-poc')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.error('Could not connect to MongoDB...', error));

const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/', root);
app.use('/api/users', users);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
