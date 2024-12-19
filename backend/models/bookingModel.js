const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },            
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passengers:[
        {
            name: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
        }
    ],
    bookingDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
        default: 'PENDING'
    },
    amountRefunded: {
        type: Number,
        default: 0
    }
}, { timestamps: true, optimisticConcurrency: true })

module.exports = mongoose.model('Booking', bookingSchema);