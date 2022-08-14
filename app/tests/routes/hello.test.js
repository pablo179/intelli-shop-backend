const status = require('http-status')
const request = require('supertest')
const app = require('../../app')

describe('Hello routes', () => {
    describe('GET /', () => {
        test('should get a json message "hello world"', async () => {
            const res = await request(app).get('/')
            expect(res.statusCode).toEqual(status.OK)
            expect(res.body.message).toEqual('hello world')
        })
    })
    describe('POST /', () => {
        test('should get the sended json message', async () => {
            const myBody = { myVariable: 'this is my variable' }
            const res = await request(app).post('/').send(myBody)
            expect(res.statusCode).toEqual(status.OK)
            expect(res.body.body).toEqual(myBody)
        })
        test('should get and empty body and a message variable', async () => {
            const res = await request(app).post('/')
            expect(res.statusCode).toEqual(status.OK)
            expect(res.body).toEqual({ message: 'message received', body: {} })
        })
    })
    describe('POST /product', () => {
        test('should get the product of n1 and n2', async () => {
            const n1 = 4
            const n2 = 3
            const res = await request(app).post('/product').send({ n1, n2 })
            expect(res.statusCode).toEqual(status.OK)
            expect(res.body.result).toEqual(n1 * n2)
        })
        test('should throw an error if n1 or n2 are negative', async () => {
            const n1 = -4
            const n2 = 3
            const res = await request(app).post('/product').send({ n1, n2 })
            expect(res.statusCode).toEqual(status.BAD_REQUEST)
            expect(res.body).toEqual({
                code: 400,
                message: 'Negative numbers not allowed',
            })
        })
        test('should throw an error if one of the numbers are missing', async () => {
            const n1 = 4
            const res = await request(app).post('/product').send({ n1 })
            expect(res.statusCode).toEqual(status.BAD_REQUEST)
            expect(res.body).toEqual({
                code: 400,
                message: 'missing variable',
            })
        })
    })
    describe('GET /auth', () => {
        test('should get a success message "Your authorized"', async () => {
            const res = await request(app)
                .get('/auth')
                .set('Authorization', 'Bearer mytoken')
                .expect(status.OK)
            // eslint-disable-next-line no-underscore-dangle
            expect(res.body).toEqual({ message: 'Your authorized' })
        })
        test('should get unauthorized if auth_token is missing', async () => {
            const res = await request(app).get('/auth')
            expect(res.statusCode).toEqual(status.UNAUTHORIZED)
            expect(res.body).toEqual({
                code: 401,
                message: 'Missing auth_token',
            })
        })
    })
})
