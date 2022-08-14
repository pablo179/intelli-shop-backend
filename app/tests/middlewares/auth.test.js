const status = require('http-status')
const httpMocks = require('node-mocks-http')
const { isLoggedIn } = require('../../middlewares/auth')
const { ApiError } = require('../../utils')

describe('Auth middlewares', () => {
    describe('isLoggedIn', () => {
        test('should throw an error if authorization token is missing', () => {
            const error = new ApiError(
                status.UNAUTHORIZED,
                'Missing auth_token'
            )
            const next = jest.fn()
            isLoggedIn(
                httpMocks.createRequest(),
                httpMocks.createResponse(),
                next
            )
            expect(next).toHaveBeenCalledWith(error)
        })
        test('should not throw an error with authorization token', () => {
            const next = jest.fn()
            const error = new ApiError(
                status.UNAUTHORIZED,
                'Missing auth_token'
            )
            isLoggedIn(
                httpMocks.createRequest({
                    headers: { authorization: 'Bearer something' },
                }),
                httpMocks.createResponse(),
                next
            )
            expect(next).not.toHaveBeenCalledWith(error)
        })
    })
})
