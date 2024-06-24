require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');
const clientRoutes = require('./routes/client');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(express.json());

// Connect to MongoDB
dbConnect();

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);
app.use('/protected', protectedRoutes);

module.exports = app;
