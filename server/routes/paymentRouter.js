const express = require('express');
const router = express.Router();
const cors = require('cors');
const { 
  getall,
  deleteonline
} = require('../controllers/payController');

router.use(
  cors({
      origin: 'http://localhost:3000',
      credentials: true
  })
)

router.get('/getallpay', getall)
router.delete('/deletepayment/:id', deleteonline)

module.exports = router;