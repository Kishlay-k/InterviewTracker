const express = require('express');
const authRoutes = require('./routes/authRoutes')
const app = express();
app.use(express.json());
app.use('/api/v1/user', authRoutes);
module.exports = app;