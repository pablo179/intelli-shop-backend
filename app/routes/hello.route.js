const express = require('express')
const helloService = require('../services/hello.service')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()
router.get('/', (_req, _res) => {
    _res.send({ message: 'hello world' })
})
router.post('/', (_req, _res) => {
    _res.send({ message: 'message received', body: _req.body })
})

router.post('/product', (_req, _res) => {
    const { n1, n2 } = _req.body
    const result = helloService.productTwoNumbers(n1, n2)
    _res.json({ result })
})

router.get('/auth', authMiddleware.isLoggedIn, (_req, _res) => {
    _res.json({ message: 'Your authorized' })
})

module.exports = router
