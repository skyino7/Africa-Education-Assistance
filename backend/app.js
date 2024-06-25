require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AuthRoutes = require('./routes/Auth.js');
const AdminRoutes = require('./routes/AdminRoutes');


const app = express();

// Connect to MongoDB
dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true,
    origin: 'http://localhost:3000'}
));

app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);

app.get('/api', (req, res) => {
    res.send('Hello, World!');
});

module.exports = app;
