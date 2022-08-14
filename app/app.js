/* eslint-disable no-underscore-dangle */
const express = require('express')
const status = require('http-status')
const { ApiError } = require('./utils')
const routes = require('./routes')
const { errorConverter, errorHandler } = require('./middlewares/error')

const app = express()

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))
// add routes

app.use('/', routes)

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new ApiError(status.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app
