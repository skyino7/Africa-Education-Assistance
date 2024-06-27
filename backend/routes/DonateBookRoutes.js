const express = require('express');
const { IsUser } = require('../middleware/verifyToken');
const bookOwner = require('../middleware/bookOwner');
const uploadMiddleware = require('../middleware/upload');

const {
    createDonateBook,
    getDonateBooks,
    getDonateBookById,
    updateDonateBook,
    deleteDonateBook
} = require('../controllers/DonateBook');

const DonateBookRoutes = express.Router();

DonateBookRoutes.post('/create', IsUser, uploadMiddleware, createDonateBook);
DonateBookRoutes.get('/getBooks', getDonateBooks);
DonateBookRoutes.get('/getBooks/:id', getDonateBookById);
DonateBookRoutes.put('/update/getBooks/:id', bookOwner, updateDonateBook);
DonateBookRoutes.delete('/delete/getBooks/:id', bookOwner, deleteDonateBook);

module.exports = DonateBookRoutes;
