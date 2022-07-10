const express = require('express')

const app = express()
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const monggoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const { globalErrorHandle } = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const AppError = require('./utils/appError')

// GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

// Body parser, reading data drom body into req.body
app.use(express.json({ limit: '10kb' }))

// Data sanitization against NoSQL injection
app.use(monggoSanitize())

// Data sanitizatin against XSS
app.use(xss())

// Prevent params pollution
app.use(hpp({
  whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}))

// Serving static files
app.use(express.static(`${__dirname}/public`))

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.all('*', (req, res, next) => {
  next(new AppError(`Cant't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandle)
module.exports = app
