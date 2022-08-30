const globalErrorHandler = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Something went wrong :(";
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        status: err.status,
        message: err.message
    });
}

module.exports = globalErrorHandler;