const express = require('express');
const cors = require('cors');
const configStaticFile = require('./src/config/configStatic');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoriesRouter');
const userRoutes = require('./src/routes/userRouter');


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configStaticFile(app);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Shopdunk API');
});

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});