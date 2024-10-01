const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database not connected', err));

// Middleware for CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Use routes after middleware
app.use('/', require('./routes/authRouters'));
app.use('/', require('./routes/productRouters'));
app.use('/', require('./routes/paymentRouter'));
app.use('/', require('./routes/invoiceRouter'));
app.use('/', require('./routes/FeedbackRouter'));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
