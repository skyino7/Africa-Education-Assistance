const express = require('express');
const { GetUsers, DeleteUser } = require('../controllers/Admin');
const { IsAdmin } = require('../middleware/verifyToken');

const AdminRoutes = express.Router();

AdminRoutes.get('/getusers', IsAdmin, GetUsers);
AdminRoutes.delete('/delete/:id', IsAdmin, DeleteUser);

module.exports = AdminRoutes;
