require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AuthRoutes = require('./routes/AuthRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
const BookCampaignRoutes = require('./routes/BookCampaignRoutes');
const DonateBookRoutes = require('./routes/DonateBookRoutes');
const SchoolBuildingRoutes = require('./routes/SchoolBuildingRoutes');
const VerifyPaymentRoutes = require('./routes/VerifyPaymentRoutes');

const app = express();

// Connect to MongoDB
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use(cors({ credentials: true,
    origin: 'http://localhost:3000',
    credentials: true,
}
));

app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/campaign', BookCampaignRoutes);
app.use('/api/donatebook', DonateBookRoutes);
app.use('/api/school-building', SchoolBuildingRoutes);
app.use('/api/paystack', VerifyPaymentRoutes);

app.get('/api', (req, res) => {
    res.send('Hello, World!');
});

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Request Body:', req.body);
    next();
});

module.exports = app;
