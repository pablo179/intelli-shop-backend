const status = require('http-status')
const { ApiError } = require('../utils')

/**
 * return product of two numbers
 * @param {number} n1
 * @param {number} n2
 * @returns {number}
 */
const productTwoNumbers = (n1, n2) => {
    if (!n1 || !n2) {
        throw new ApiError(status.BAD_REQUEST, 'missing variable')
    }
    if (n1 < 0 || n2 < 0) {
        throw new ApiError(status.BAD_REQUEST, 'Negative numbers not allowed')
    }
    return n1 * n2
}

module.exports = {
    productTwoNumbers,
}
