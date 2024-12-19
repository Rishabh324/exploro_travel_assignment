const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: [true, 'Please enter the trip name']
    },
    tripDescription: {
        type: String,
        required: [true, 'Please enter the trip description']
    },
    tripPrice: {
        type: Number,
        required: [true, 'Please enter the trip price']
    },
    tripDate: {
        type: Date,
        required: [true, 'Please enter the trip date']
    },
    tripDuration: {
        type: Number,
        required: [true, 'Please enter the trip duration']
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'CANCELLED'],
        default: 'ACTIVE'
    },
    availableSlots: {
        type: Number,
        required: [true, 'Please enter the available slots']
    },
}, { timestamps: true, optimisticConcurrency: true });

module.exports =  mongoose.model('Trip', tripSchema);