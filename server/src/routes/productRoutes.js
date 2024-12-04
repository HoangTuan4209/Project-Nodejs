const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Định nghĩa các routes
router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductDetail);

// thêm các routes mới cho admin
router.get('/admin/products', productController.adminGetAllProducts);
router.post('/admin/products', productController.adminCreateProduct);
router.put('/admin/products/:id', productController.adminUpdateProduct);
router.delete('/admin/products/:id', productController.adminDeleteProduct);

module.exports = router;