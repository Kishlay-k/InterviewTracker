const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const Err = require('./utility/error');
const globalErrorHandler = require('./utility/globalErrorHandler');


const authRoutes = require('./routes/authRoutes')
const questionRoutes = require('./routes/questionRoutes')
const userRoutes = require('./routes/userRoutes')
const commentRoutes = require('./routes/commentRoutes');


// Midlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/api/v1/problemset', questionRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/comments',commentRoutes);
app.use('*', (req, res, next) => {
    next(new Err("There is nothing for you here >_<", 404));
});
app.use(globalErrorHandler);

module.exports = app;