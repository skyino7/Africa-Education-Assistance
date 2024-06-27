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
    state: {
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
    verified: {
        type: Boolean,
        default: false
    },
});

const SchoolBuilding = mongoose.model('SchoolBuilding', schoolBuildingSchema);

module.exports = SchoolBuilding;
