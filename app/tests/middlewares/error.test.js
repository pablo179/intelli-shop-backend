const status = require('http-status')
const httpMocks = require('node-mocks-http')
const { errorConverter, errorHandler } = require('../../middlewares/error')
const { ApiError } = require('../../utils')
const config = require('../../config')

describe('Error middlewares', () => {
    describe('Error converter', () => {
        test('should return the same ApiError object it was called with', () => {
            const error = new ApiError(status.BAD_REQUEST, 'Any error')
            const next = jest.fn()

            errorConverter(
                error,
                httpMocks.createRequest(),
                httpMocks.createResponse(),
                next
            )

            expect(next).toHaveBeenCalledWith(error)
        })

        test('should convert an Error to ApiError and preserve its status and message', () => {
            const error = new Error('Any error')
            error.statusCode = status.BAD_REQUEST
            const next = jest.fn()

            errorConverter(
                error,
                httpMocks.createRequest(),
                httpMocks.createResponse(),
                next
            )

            expect(next).toHaveBeenCalledWith(expect.any(ApiError))
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: error.statusCode,
                    message: error.message,
                    isOperational: false,
                })
            )
        })

        test('should convert an Error without status to ApiError with status 500', () => {
            const error = new Error('Any error')
            const next = jest.fn()

            errorConverter(
                error,
                httpMocks.createRequest(),
                httpMocks.createResponse(),
                next
            )

            expect(next).toHaveBeenCalledWith(expect.any(ApiError))
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: status.INTERNAL_SERVER_ERROR,
                    message: error.message,
                    isOperational: false,
                })
            )
        })

        test('should convert an Error without message to ApiError with default message of that http status', () => {
            const error = new Error()
            error.statusCode = status.BAD_REQUEST
            const next = jest.fn()

            errorConverter(
                error,
                httpMocks.createRequest(),
                httpMocks.createResponse(),
                next
            )

            expect(next).toHaveBeenCalledWith(expect.any(ApiError))
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: error.statusCode,
                    message: status[error.statusCode],
                    isOperational: false,
                })
            )
        })

        test('should convert any other object to ApiError with status 500 and its message', () => {
            const error = {}
            const next = jest.fn()

            errorConverter(
                error,
                httpMocks.createRequest(),
                httpMocks.createResponse(),
                next
            )

            expect(next).toHaveBeenCalledWith(expect.any(ApiError))
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    statusCode: status.INTERNAL_SERVER_ERROR,
                    message: status[status.INTERNAL_SERVER_ERROR],
                    isOperational: false,
                })
            )
        })
    })

    describe('Error handler', () => {
        test('should send proper error response and put the error message in res.locals', () => {
            const error = new ApiError(status.BAD_REQUEST, 'Any error')
            const res = httpMocks.createResponse()
            const sendSpy = jest.spyOn(res, 'send')

            errorHandler(error, httpMocks.createRequest(), res)

            expect(sendSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    code: error.statusCode,
                    message: error.message,
                })
            )
            expect(res.locals.errorMessage).toBe(error.message)
        })

        test('should send internal server error status and message if in production mode and error is not operational', () => {
            config.env = 'prod'
            const error = new ApiError(status.BAD_REQUEST, 'Any error', false)
            const res = httpMocks.createResponse()
            const sendSpy = jest.spyOn(res, 'send')

            errorHandler(error, httpMocks.createRequest(), res)

            expect(sendSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    code: status.INTERNAL_SERVER_ERROR,
                    message: status[status.INTERNAL_SERVER_ERROR],
                })
            )
            expect(res.locals.errorMessage).toBe(error.message)
            config.env = process.env.NODE_ENV
        })

        test('should preserve original error status and message if in production mode and error is operational', () => {
            config.env = 'prod'
            const error = new ApiError(status.BAD_REQUEST, 'Any error')
            const res = httpMocks.createResponse()
            const sendSpy = jest.spyOn(res, 'send')

            errorHandler(error, httpMocks.createRequest(), res)

            expect(sendSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    code: error.statusCode,
                    message: error.message,
                })
            )
            config.env = process.env.NODE_ENV
        })
    })
})
