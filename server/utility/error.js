class Err extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = toString(statusCode).startsWith('4') ? 'Failed' : 'Error';
        Error.captureStackTrace(this, this.constructor);
    }
};

module.exports = Err;