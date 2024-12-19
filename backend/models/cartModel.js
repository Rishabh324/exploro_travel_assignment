const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true, optimisticConcurrency: true });

module.exports = mongoose.model('Cart', cartSchema);