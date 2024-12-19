const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
    },
    name: {
        type: String,
        required: [true, "name is required"],
    },
    phone: {
        type: Number,
        required: [true, "phone is required"],
    },
    password: {
        type: String,
        required: [true, "A password must be there."],
    },
    role: {
        type: String,
        enum: ["organizer", "user"],
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);