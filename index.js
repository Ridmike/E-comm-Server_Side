const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());            // Use Express built-in JSON parser
app.use(cors({ origin: '*' }));

// setting static folder path
app.use('/image/products', express.static('public/products'));
app.use('/image/category', express.static('public/category'));
app.use('/image/poster', express.static('public/posters'));

// Routes
app.use('/categories', require('./routes/category'));
app.use('/subCategories', require('./routes/subCategory'));
app.use('/brands', require('./routes/brand'));
app.use('/variantTypes', require('./routes/variantType'));
app.use('/variants', require('./routes/variant'));
app.use('/products', require('./routes/product'));
app.use('/couponCodes', require('./routes/couponCode'));
app.use('/posters', require('./routes/poster'));
app.use('/users', require('./routes/user'));
app.use('/orders', require('./routes/order'));
app.use('/payment', require('./routes/payment'));
app.use('/notification', require('./routes/notification'));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Example route using asyncHandler directly
app.get('/', asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'API working successfully', data: null });
}));

// Global error handler
app.use((error, req, res, next) => {
  res.status(500).json({ success: false, message: error.message, data: null });
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
