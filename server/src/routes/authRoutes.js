const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Đăng nhập
router.post('/login', authController.login);
// Đăng ký
router.post('/register', authController.register);
// Đăng xuất
router.post('/logout', authController.logout);
// Refresh token
router.post('/refresh-token', authController.refreshToken);

module.exports = router;