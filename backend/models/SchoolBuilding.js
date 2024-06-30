const mongoose = require('mongoose');

const schoolBuildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    AmountNeeded: {
        type: Number,
        required: true
    },
    AmountRaised:{
        type: Number
    },
    verified: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const SchoolBuilding = mongoose.model('SchoolBuilding', schoolBuildingSchema);

module.exports = SchoolBuilding;
