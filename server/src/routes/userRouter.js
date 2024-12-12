const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);

// Lấy thông tin hồ sơ người dùng
router.get("/profile/:id", userController.getUserProfile);

router.get('/admin/users', userController.getAllUsers);
router.post('/admin/users', userController.createUser);
router.put('/admin/users/:id', userController.updateUser);
router.delete('/admin/users/:id', userController.deleteUser);

module.exports = router;