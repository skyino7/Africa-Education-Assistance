const mongoose = require('mongoose');

const donateBookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    donateDate: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        required: true
    }
});

const DonateBook = mongoose.model('DonateBook', donateBookSchema);

module.exports = DonateBook;
