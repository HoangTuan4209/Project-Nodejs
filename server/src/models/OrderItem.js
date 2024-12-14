const pool = require('../config/database');

class OrderItem {
  static createOrderItems(cartItems, orderId) {
    const values = cartItems.map(item => [orderId, item.product_id, item.quantity, item.price]);
    const query = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ?
    `;
    return pool.query(query, [values]);
  }
}

module.exports = OrderItem;
