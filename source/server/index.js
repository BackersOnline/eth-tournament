if (!require('dotenv').load()) {
  console.error(`No .env file found. Make sure you have a .env file in the root directory`);
  process.exit(1);
}

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const AuthRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

AuthRoutes(app);

const listener = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://${listener.address().address}:${listener.address().port}`);
});
