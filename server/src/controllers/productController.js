const Product = require("../models/productModel");

const productController = {
  // Giữ nguyên các methods cũ
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching products",
        error: error.message,
      });
    }
  },

  getProductDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.getProductWithDetails(id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching product details",
        error: error.message,
      });
    }
  },

  // Thêm các methods mới cho admin
  adminGetAllProducts: async (req, res) => {
    try {
      const products = await Product.getAllProductsWithCategories();
      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching products for admin",
        error: error.message,
      });
    }
  },

  adminCreateProduct: async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = await Product.createProduct(productData);
      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating product",
        error: error.message,
      });
    }
  },

  adminUpdateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const productData = req.body;
      const updatedProduct = await Product.updateProduct(id, productData);

      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating product",
        error: error.message,
      });
    }
  },

  adminDeleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Product.deleteProduct(id);

      if (!result) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting product",
        error: error.message,
      });
    }
  },
};

module.exports = productController;
