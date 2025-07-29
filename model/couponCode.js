const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    couponCode:{
        type: String,
        require: true,
        unique: true
    },
    discountType:{
        type: String,
        enum: ['fixed', 'percentage'],
        require: true
    },
    discountAmount:{
        type: Number,
        require: true
    },
    minimumPurchaseAmount: {
        type: Number,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    applicableCategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    applicableSubCategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    },
    applicableProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
}, {timestamps: true});

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;