const cookieParser = require('cookie-parser');
const express = require('express');
const authRoutes = require('./routes/authRoutes')
const questionRoutes = require('./routes/questionRoutes')
const Err = require('./utility/error');
const globalErrorHandler = require('./utility/globalErrorHandler');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('*', (req, res, next) => {
    next(new Err("There is nothing for you here >_<", 404));
});
app.use(globalErrorHandler);
module.exports = app;
