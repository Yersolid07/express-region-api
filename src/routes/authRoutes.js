const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Route untuk login (public)
router.post('/login', login);

// Route untuk logout (protected)
router.post('/logout', authenticateToken, logout);

module.exports = router;
