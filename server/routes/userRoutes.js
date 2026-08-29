const express = require('express');
const router = express.Router();
const { getAllUsers, getFacultyProfile } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getFacultyProfile);

module.exports = router;
