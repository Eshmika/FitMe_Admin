const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,
    registerAdmin,
    getProfile
} = require('../controllers/authController');

router.use(
  cors({
      origin: 'http://localhost:3000',
      credentials: true
  })
)

router.get('/', test)

// router.post('/adminregister', registerAdmin)
router.post('/adminregister', registerAdmin)
router.get('/adminprofile', getProfile)


module.exports = router;