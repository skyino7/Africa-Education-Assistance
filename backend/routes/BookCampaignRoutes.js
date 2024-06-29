const express = require('express');
const { IsUser, IsAdmin } = require('../middleware/verifyToken');
const verifyOwner = require('../middleware/verifyOwner');
const uploadMiddleware = require('../middleware/upload');

const BookCampaignRoutes = express.Router();

const {
    createBookCampaign,
    getBookCampaigns,
    getBookCampaignById,
    updateBookCampaign,
    deleteBookCampaign
} = require('../controllers/BookCampaign');


BookCampaignRoutes.post('/create', IsUser, uploadMiddleware, createBookCampaign);
BookCampaignRoutes.get('/getbookcampaigns', getBookCampaigns);
BookCampaignRoutes.get('/getbookcampaigns/:id', getBookCampaignById);
BookCampaignRoutes.put('/update/bookcampaigns/:id', verifyOwner, updateBookCampaign);
BookCampaignRoutes.delete('/delete/bookcampaigns/:id', verifyOwner, deleteBookCampaign);

module.exports = BookCampaignRoutes;
