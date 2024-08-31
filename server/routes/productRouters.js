const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createproduct
} = require('../controllers/productController');

router.use(
  cors({
      origin: 'http://localhost:3000',
      credentials: true
  })
)
router.post('/createproduct', createproduct)


module.exports = router;