const express = require('express');
const verifyDonation = require('../controllers/verifyDonation');

const VerifyPaymentRoutes = express.Router();

VerifyPaymentRoutes.post('/verify', verifyDonation);

module.exports = VerifyPaymentRoutes;
