const db = require('../config/database');

const Product = {
    // Giữ nguyên các methods cũ
    getAllProducts: async () => {
        try {
            const [results] = await db.query('SELECT * FROM products');
            return results;
        } catch (err) {
            console.log('Error: ', err);
            throw err;
        }
    },

    getProductWithDetails: async (productId) => {
        try {
            const [product] = await db.execute(
                `SELECT p.*, c.category_name 
                 FROM products p 
                 LEFT JOIN categories c ON p.category_id = c.category_id 
                 WHERE p.product_id = ?`,
                [productId]
            );

            if (product.length === 0) return null;

            const [variants] = await db.execute(
                `SELECT * FROM product_details WHERE product_id = ?`,
                [productId]
            );

            return {
                ...product[0],
                variants
            };
        } catch (error) {
            throw error;
        }
    },

    // Thêm các methods mới cho admin
    getAllProductsWithCategories: async () => {
        try {
            const [results] = await db.query(`
                SELECT p.*, c.category_name 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.category_id
                ORDER BY p.created_at DESC
            `);
            return results;
        } catch (error) {
            throw error;
        }
    },

    createProduct: async (productData) => {
        try {
            const { name, description, price, category_id, stock_quantity, image } = productData;
            const [result] = await db.execute(
                `INSERT INTO products (name, description, price, category_id, stock_quantity, image) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [name, description, price, category_id, stock_quantity, image]
            );
            
            const [newProduct] = await db.execute(
                'SELECT * FROM products WHERE product_id = ?',
                [result.insertId]
            );
            
            return newProduct[0];
        } catch (error) {
            throw error;
        }
    },

    updateProduct: async (productId, productData) => {
        try {
            const { name, description, price, category_id, stock_quantity, image } = productData;
            
            const [result] = await db.execute(
                `UPDATE products 
                 SET name = ?, description = ?, price = ?, 
                     category_id = ?, stock_quantity = ?, 
                     image = ?, updated_at = NOW()
                 WHERE product_id = ?`,
                [name, description, price, category_id, stock_quantity, image, productId]
            );

            if (result.affectedRows === 0) return null;

            const [updatedProduct] = await db.execute(
                'SELECT * FROM products WHERE product_id = ?',
                [productId]
            );
            
            return updatedProduct[0];
        } catch (error) {
            throw error;
        }
    },

    deleteProduct: async (productId) => {
        try {
            const [result] = await db.execute(
                'DELETE FROM products WHERE product_id = ?',
                [productId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Product;