const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createproduct,
  getall,
  getProductbyid,
  updateProductbyid
} = require('../controllers/productController');

router.use(
  cors({
      origin: 'http://localhost:3000',
      credentials: true
  })
)
router.post('/createproduct', createproduct)
router.get('/getallproduct', getall)
router.get('/getproductbyid/:id', getProductbyid)
router.put('/updateproductbyid/:code', updateProductbyid)



module.exports = router;