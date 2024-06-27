const mongoose = require('mongoose');

const bookCampaignSchema = new mongoose.Schema({
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
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    received: {
        type: Boolean,
        default: false
    }
});

const BookCampaign = mongoose.model('BookCampaign', bookCampaignSchema);

module.exports = BookCampaign;
