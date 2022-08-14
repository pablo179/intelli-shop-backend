const express = require('express')
const helloRoute = require('./hello.route')
const docsRoute = require('./docs.route')
const config = require('../config')

const router = express.Router()

const appRoutes = [
    {
        path: '/',
        route: helloRoute,
    },
]

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
        route: docsRoute,
    },
]

appRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

if (config.env === 'dev') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route)
    })
}

module.exports = router
