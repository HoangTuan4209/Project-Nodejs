const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

const createOrder = async (userId, cartItems) => {
  try {
    // Tính tổng tiền từ cartItems
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Thông tin đơn hàng mẫu
    const orderData = {
      user_id: userId,
      total_amount: totalAmount,
      shipping_address: '123 Example Street',
      phone: '0123456789',
      order_status: 'Pending',
      payment_status: 'Unpaid',
      payment_method: 'COD',
    };

    // Tạo đơn hàng
    const [orderResult] = await Order.createOrder(orderData);
    const orderId = orderResult.insertId;

    // Tạo các mục trong đơn hàng
    await OrderItem.createOrderItems(cartItems, orderId);

    return { success: true, message: 'Order created successfully', orderId };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, message: 'Error creating order', error };
  }
};

module.exports = { createOrder };
