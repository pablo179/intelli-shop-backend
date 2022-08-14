const status = require('http-status')
const { ApiError } = require('../utils')

const isLoggedIn = (req, _res, next) => {
    const authToken = req.headers.authorization
    if (!authToken) {
        next(new ApiError(status.UNAUTHORIZED, 'Missing auth_token'))
    }
    next()
}

module.exports = {
    isLoggedIn,
}
