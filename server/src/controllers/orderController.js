const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

const createOrder = async (userId, cartItems) => {
  try {
    console.log('Starting order creation with:', { userId, cartItems });

    // Validate input
    if (!userId || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.error('Invalid input data:', { userId, cartItems });
      return { success: false, message: 'Invalid order data' };
    }

    // Tính tổng tiền
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Tạo đơn hàng mới
    const orderData = {
      user_id: userId,
      total_amount: totalAmount,
      shipping_address: cartItems[0].shipping_address || 'Default Address', // Cần thêm địa chỉ vào form đặt hàng
      phone: cartItems[0].phone || 'Default Phone', // Cần thêm số điện thoại vào form đặt hàng
      order_status: 'Pending',
      payment_status: 'Unpaid',
      payment_method: 'COD'
    };

    // Insert vào bảng orders
    const [orderResult] = await Order.createOrder(orderData);
    const orderId = orderResult.insertId;
    console.log('Order created with ID:', orderId);

    // Tạo order items
    const orderItems = cartItems.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    // Insert vào bảng order_items
    await Promise.all(orderItems.map(item => OrderItem.createOrderItem(item)));
    console.log('Order items created successfully');

    return {
      success: true,
      message: 'Order created successfully',
      orderId,
      orderDetails: { ...orderData, id: orderId }
    };

  } catch (error) {
    console.error('Error in createOrder:', error);
    return { success: false, message: 'Error creating order', error: error.message };
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    await Order.updateStatus(orderId, status);
    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
};
