const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users')

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, email, password, firstname, lastname, role } = req.body

    const user = new User({
        username,
        email,
        password,
        firstname,
        lastname,
        role
    })

    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect Email or Password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect Email or Password' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
