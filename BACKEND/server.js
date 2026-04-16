const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './env' });

const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Root
app.get('/', (req, res) => {
  res.send('E-Commerce API is running...');
});

// Connect to MongoDB & start server
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));