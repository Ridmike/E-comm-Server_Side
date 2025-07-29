const mongoose = require('mongoose');
const Product = require('./product');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            productName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            variant: {
                type: String,
            },
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true,
        phone: String,
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'paypal'],
        required: true
    },
    couponCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
    },
    orderTotal: {
        subTotal: Number,
        discount: Number,
        total: Number
    },
    trackingUrl: {
        type: String
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;