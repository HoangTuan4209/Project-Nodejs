// src/services/productService.js
const API_URL = "http://localhost:8000/api";

const productService = {
  // Lấy tất cả sản phẩm cho admin
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/admin/products`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo sản phẩm mới
  createProduct: async (productData) => {
    try {
      const response = await fetch(`${API_URL}/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/admin/products/${id}`, {
        method: "DELETE",
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default productService;
