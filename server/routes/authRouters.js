const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,
    // registerAdmin,
    loginAdmin
} = require('../controllers/authController');

//middleware
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true
    })
  );  



router.get('/', test)

// router.post('/adminregister', registerAdmin)
router.post('/adminlogin', loginAdmin)


module.exports = router;