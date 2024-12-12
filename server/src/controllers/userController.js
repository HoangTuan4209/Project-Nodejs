const db = require("../config/database");
const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  // Đăng ký
  register: async (req, res) => {
    try {
      const { username, email, password, full_name, phone, address } = req.body;

      // Kiểm tra username đã tồn tại chưa
      const [existingUser] = await db.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [username, email]
      );

      if (existingUser.length > 0) {
        return res.status(400).json({
          message: "Username hoặc email đã tồn tại",
        });
      }

      // Mã hóa password
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(password, salt);

      // Thêm user mới
      const [result] = await db.query(
        "INSERT INTO users (username, email, password, full_name, phone, address, role_id) VALUES (?, ?, ?, ?, ?, ?, 2)",
        [username, email, password, full_name, phone, address]
      );

      res.status(201).json({
        message: "Đăng ký thành công",
        user_id: result.insertId,
      });
    } catch (error) {
      res.status(500).json({
        message: "Đã có lỗi xảy ra",
      });
    }
  },

  // Đăng nhập
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Kiểm tra email
      const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (users.length === 0) {
        return res.status(401).json({
          message: "Username hoặc mật khẩu không đúng",
        });
      }

      const user = users[0];

      if (password !== user.password) {
        return res.status(401).json({
          message: "Username hoặc mật khẩu không đúng",
        });
      }

      // Tạo JWT token
      const token = jwt.sign(
        { user_id: user.user_id, username: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Trong login API
      if (user.role_id === 1) {
        // Admin
        return res.json({
          message: "Đăng nhập thành công",
          token,
          user: {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            role_id: user.role_id,
          },
          redirectUrl: "/admin",
        });
      } else {
        // User
        return res.json({
          message: "Đăng nhập thành công",
          token,
          user: {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            role_id: user.role_id,
          },
          redirectUrl: "/",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Đã có lỗi xảy ra",
      });
    }
  },

  // Method lấy tất cả user trong database hiển thị ra quản lí user trong admin
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  },

  // Create new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      console.log("req.body", req.body);     
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const updated = await User.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error updating user",
        error: error.message,
      });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const deleted = await User.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting user",
        error: error.message,
      });
    }
  },

  // Lấy thông tin hồ sơ người dùng
  getUserProfile: async (req, res) => {
    try {
      const user_id = req.params.id;

      const [users] = await db.query("SELECT * FROM users WHERE user_id = ?", [user_id]);

      if (users.length === 0) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      const user = users[0];
      res.json({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        address: user.address,
        role_id: user.role_id,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Đã có lỗi xảy ra" });
    }
  },
};

module.exports = userController;
