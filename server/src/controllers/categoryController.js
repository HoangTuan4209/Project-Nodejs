const db = require('../config/database');

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const [categories] = await db.execute('SELECT * FROM categories');
            res.json(categories);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const [category] = await db.execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
            if (category.length === 0) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category[0]);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getProductsByCategory: async (req, res) => {
        try {
            const categoryId = req.params.id; // Lấy id từ params
            
            // Kiểm tra category có tồn tại
            const [category] = await db.execute(
                'SELECT * FROM categories WHERE category_id = ?',
                [categoryId]
            );
    
            if (category.length === 0) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            // Lấy sản phẩm theo category_id
            const [products] = await db.execute(
                'SELECT * FROM products WHERE category_id = ?',
                [categoryId]
            );
            
            res.json(products);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = categoryController;