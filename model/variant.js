const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Variant name is required'],
        trim: true
    },
    variantTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VariantType',
        required: [true, 'Variant Type ID is required']
    }
}, {timestamps: true});

const Variant = mongoose.model('Variant', variantSchema);
module.exports = Variant;