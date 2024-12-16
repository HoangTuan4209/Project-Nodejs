const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus} = require('../controllers/orderController');

router.post('/create', async (req, res) => {
  const { userId, cartItems } = req.body;

  const result = await createOrder(userId, cartItems);

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result);
  }
});

router.get('/all', getAllOrders);
router.put('/update-status/:orderId', updateOrderStatus);

module.exports = router;
