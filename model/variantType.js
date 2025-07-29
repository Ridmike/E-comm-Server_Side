const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Variant name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        trim: true
    }
}, {timestamps: true});

const VariantType = mongoose.model('VariantType', variantSchema);
module.exports = VariantType;