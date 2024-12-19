const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    amountRefunded: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['SUCCESS', 'FAILED', 'REFUNDED'],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);