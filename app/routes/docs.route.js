const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { version } = require('../../package.json')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'node-express-boilerplate API documentation',
        version,
    },
}

const router = express.Router()

const specs = swaggerJSDoc({
    swaggerDefinition,
    apis: ['src/docs.js'],
})

router.use('/', swaggerUi.serve)
router.get(
    '/',
    swaggerUi.setup(specs, {
        explorer: true,
    })
)

module.exports = router
