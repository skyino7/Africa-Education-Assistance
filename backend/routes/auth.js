const express = require('express');
const jwt = require('jsonwebtoken');
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
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid username or password');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).send('Invalid username or password');

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
