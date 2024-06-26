const express = require('express');
const { Register, Login, CheckUser, Logout } = require('../controllers/Auth');
const { IsUser } = require('../middleware/verifyToken');

const AuthRoutes = express.Router();

AuthRoutes.post('/register', Register);
AuthRoutes.post('/login', Login);
AuthRoutes.get('/CheckUser', IsUser, CheckUser);
AuthRoutes.get('/logout', Logout);

module.exports = AuthRoutes;
