const express = require('express');
const router = express.Router();
const cors = require('cors');
const { 
  getall
} = require('../controllers/FeedbackController');

router.use(
  cors({
      origin: 'http://localhost:3000',
      credentials: true
  })
)

router.get('/getallfeedback', getall)


module.exports = router;