const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Bạn cần đăng nhập để truy cập." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin user vào request

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập trang này." });
    }

    next(); // Cho phép đi tiếp nếu là admin
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn." });
  }
};

module.exports = authMiddleware;
