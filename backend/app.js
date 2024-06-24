const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');
const clientRoutes = require('./routes/client');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

// Connect to MongoDB
dbConnect();

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);

module.exports = app;
