const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// Protected route (accessible to both clients and admins)
router.get('/', auth(['client', 'admin']), (req, res) => {
    res.send(`Welcome, ${req.user.role}!`);
});

module.exports = router;
