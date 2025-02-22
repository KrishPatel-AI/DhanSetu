const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');

// Route to create a user
router.post('/create', createUser);

module.exports = router;
