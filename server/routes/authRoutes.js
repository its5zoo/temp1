const express = require('express');
const router = express.Router();
const { loginByEmail, getDemoAccounts } = require('../controllers/authController');

router.post('/login', loginByEmail);
router.get('/demo-accounts', getDemoAccounts);

module.exports = router;
