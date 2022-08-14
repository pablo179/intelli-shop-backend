const status = require('http-status')
const config = require('../config')
const { ApiError } = require('../utils')

const errorConverter = (err, req, res, next) => {
    let error = err
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || status.INTERNAL_SERVER_ERROR
        const message = error.message || status[statusCode]
        error = new ApiError(statusCode, message, false, error.stack)
    }
    next(error)
}

const errorHandler = (err, req, res, _next) => {
    let { statusCode, message } = err
    if (config.env === 'prod' && !err.isOperational) {
        statusCode = status.INTERNAL_SERVER_ERROR
        message = status[status.INTERNAL_SERVER_ERROR]
    }
    res.locals.errorMessage = err.message
    const response = {
        code: statusCode,
        message,
        ...(config.env === 'dev' && { stack: err.stack }),
    }
    if (config.env === 'dev') {
        console.error(err)
    }
    res.status(statusCode).send(response)
}

module.exports = {
    errorConverter,
    errorHandler,
}
