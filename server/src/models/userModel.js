const db = require("../config/database");

const User = {
  getAllUsers: async () => {
    try {
      const [results] = await db.query("SELECT * FROM users");
      return results;
    } catch (err) {
      console.log("Error: ", err);
      throw err;
    }
  },

  // Thêm mới người dùng
  create: async (userData) => {
    try {
      const { username, email, password, full_name, phone, address, role_id } = userData;
      
      // Thực hiện câu lệnh INSERT
      const [result] = await db.query(
        "INSERT INTO users (username, email, password, full_name, phone, address, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, email, password, full_name, phone, address, role_id]
      );

      // Trả về thông tin người dùng mới
      return {
        user_id: result.insertId,
        username,
        email,
        full_name,
        phone,
        address,
        role_id,
      };
    } catch (err) {
      console.error("Error in User.create:", err);
      throw err;
    }
  },

  // update user
  update: async (id, userData) => {
    try {
      // Sử dụng câu lệnh SQL để cập nhật user
      const [result] = await db.query("UPDATE users SET ? WHERE user_id = ?", [
        userData,
        id,
      ]);
      return result.affectedRows > 0; // Trả về true nếu cập nhật thành công
    } catch (err) {
      console.error("Error in User.update:", err);
      throw err;
    }
  },

  delete: async (user_id) => {
    try {
      const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [user_id]);
      return result.affectedRows > 0; // Trả về true nếu có người dùng bị xóa
    } catch (err) {
      console.error("Error in User.delete:", err);
      throw err;
    }
  },
};

module.exports = User;
