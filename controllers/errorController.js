const AppError = require('../utils/appError')

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateFieldDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((e) => e.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpriredError = () => new AppError('Your token is exprired! Please log in again', 401)

exports.globalErrorHandle = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  /** Operational, trusted error: send message to client */
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    })
    /** Programming or other unknown error: don't leak error detail */
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error)
    } else if (error.name === 11000) {
      error = handleDuplicateFieldDB(error)
    } else if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error)
    } else if (error.name === 'JsonWebTokenError') {
      error = handleJWTError()
    } else if (error.name === 'TokenExpriredError') {
      error = handleJWTExpriredError()
    }
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      })
    } else {
      console.error('ERROR ', error)
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong~',
      })
    }
  }
}
