const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// Protected route (only accessible to admins)
router.get('/', auth('admin'), (req, res) => {
    res.send('Welcome, Admin!');
});

module.exports = router;
