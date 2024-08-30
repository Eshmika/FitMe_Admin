const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database not connected', err));


  app.use('/', require('./routes/authRouters'));

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
