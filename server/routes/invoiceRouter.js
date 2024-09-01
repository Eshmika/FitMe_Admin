const express = require('express');
const router = express.Router();
const cors = require('cors');
const { 
  getall,
  deleteinvoice
} = require('../controllers/invoiceController');

router.use(
  cors({
      origin: 'http://localhost:3000',
      credentials: true
  })
)

router.get('/getallinvoice', getall)
router.delete('/deleteinvoice/:id', deleteinvoice)

module.exports = router;