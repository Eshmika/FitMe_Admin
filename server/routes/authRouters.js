const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,
    registerAdmin,
    getProfile,
    loginAdmin,
    logout,
} = require('../controllers/authController');

router.use(
  cors({
      origin: 'http://localhost:3000',
      credentials: true
  })
)

router.get('/', test)

router.post('/adminlogin', loginAdmin)
router.post('/adminregister', registerAdmin)
router.get('/adminprofile', getProfile)
router.get('/logout', logout)


module.exports = router;