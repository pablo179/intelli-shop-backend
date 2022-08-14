/* eslint-disable jest/no-conditional-expect */
const status = require('http-status')
const { productTwoNumbers } = require('../../services/hello.service')
const { ApiError } = require('../../utils')

describe('Hello service', () => {
    describe('productTwoNumbers', () => {
        test('should get the 8 if variables are 4 and 2', () => {
            const n1 = 4
            const n2 = 2
            const result = n1 * n2
            const serviceResult = productTwoNumbers(n1, n2)
            expect(serviceResult).toEqual(result)
        })
        test('should throw an error if one of the variables are undefined', () => {
            const n1 = 4
            const expectedError = new ApiError(
                status.BAD_REQUEST,
                'missing variable'
            )
            try {
                expect(productTwoNumbers(n1)).not.toThrow(expectedError)
            } catch (e) {
                expect(e).toEqual(expectedError)
            }
        })
        test('should throw an error if one of the variables are negative number', () => {
            const n1 = 4
            const n2 = -2
            const expectedError = new ApiError(
                status.BAD_REQUEST,
                'Negative numbers not allowed'
            )
            try {
                expect(productTwoNumbers(n1, n2)).not.toThrow(expectedError)
            } catch (e) {
                expect(e).toEqual(expectedError)
            }
        })
    })
})
