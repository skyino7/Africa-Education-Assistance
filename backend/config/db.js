const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/african-education-assistance', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to Database');
    }
    catch (err) {
        console.log('Failed to connect to Database', err);
    }
};

module.exports = dbConnect;
