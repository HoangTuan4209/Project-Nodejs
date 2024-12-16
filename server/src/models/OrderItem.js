const pool = require('../config/database');

class OrderItem {
  static async createOrderItem(itemData) {
    const { order_id, product_id, quantity, price } = itemData;

    const query = `
      INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        price
      ) VALUES (?, ?, ?, ?)
    `;

    try {
      return await pool.execute(query, [
        order_id,
        product_id,
        quantity,
        price
      ]);
    } catch (error) {
      console.error('Error in createOrderItem:', error);
      throw error;
    }
  }
}

module.exports = OrderItem;
