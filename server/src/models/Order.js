const pool = require('../config/database');

class Order {
  static createOrder(order) {
    const { user_id, total_amount, shipping_address, phone, order_status, payment_status, payment_method } = order;
    const query = `
      INSERT INTO orders (user_id, total_amount, shipping_address, phone, order_status, payment_status, payment_method, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    return pool.execute(query, [user_id, total_amount, shipping_address, phone, order_status, payment_status, payment_method]);
  }
}

module.exports = Order;
