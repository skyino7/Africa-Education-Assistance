const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');
const clientRoutes = require('./routes/client');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnect();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/client', clientRoutes);

module.exports = app;
