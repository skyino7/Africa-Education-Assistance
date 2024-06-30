const express = require('express');
const { Register, Login, Profile, CheckUser, Logout } = require('../controllers/Auth');
const { IsUser } = require('../middleware/verifyToken');

const AuthRoutes = express.Router();

AuthRoutes.post('/register', Register);
AuthRoutes.post('/login', Login);
AuthRoutes.get('/CheckUser', IsUser, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'User is authenticated',
        user: req.user
    });
});
AuthRoutes.get('/profile', Profile);
AuthRoutes.get('/logout', Logout);

module.exports = AuthRoutes;
