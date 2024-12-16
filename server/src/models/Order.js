const pool = require('../config/database');

class Order {
  static async getAllOrders() {
    try {
      const query = `
        SELECT 
          o.*,
          u.username,
          u.full_name,
          u.email,
          u.phone as user_phone,
          u.address as user_address
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.user_id
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.product_id
        GROUP BY o.order_id
        ORDER BY o.created_at DESC
      `;
      
      const [rows] = await pool.query(query);
      return [rows];
    } catch (error) {
      console.error('Database error in getAllOrders:', error);
      throw new Error('Failed to fetch orders from database');
    }
  }

  static async createOrder(orderData) {
    const {
      user_id,
      total_amount,
      shipping_address,
      phone,
      order_status,
      payment_status,
      payment_method
    } = orderData;

    const query = `
      INSERT INTO orders (
        user_id,
        total_amount,
        shipping_address,
        phone,
        order_status,
        payment_status,
        payment_method,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    try {
      return await pool.execute(query, [
        user_id,
        total_amount,
        shipping_address,
        phone,
        order_status,
        payment_status,
        payment_method
      ]);
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    }
  }

  static async updateStatus(orderId, status) {
    try {
      const query = `
        UPDATE orders 
        SET 
          order_status = ?,
          updated_at = NOW()
        WHERE order_id = ?  /* Đổi từ id thành order_id */
      `;
      
      const [result] = await pool.execute(query, [status, orderId]);
      return result;
    } catch (error) {
      console.error('Database error in updateStatus:', error);
      throw new Error('Failed to update order status');
    }
  }
}

module.exports = Order;