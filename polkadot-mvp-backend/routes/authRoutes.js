const express = require('express');
const router = express.Router();
const { connectWallet, promoteToEmployer } = require('../controllers/authController');

router.post('/connect-wallet', connectWallet);
router.post('/promote', promoteToEmployer);  // 👈 this one

module.exports = router;
