const db = require('../config/database');

const Category = {
    getAll: async () => {
        try {
            const [rows] = await db.execute('SELECT * FROM categories');
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Category;