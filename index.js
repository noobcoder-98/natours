const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
  console.log('UNCAUGHT EXCEPTION! Shuting down...')
  process.exit(1)
})
dotenv.config({ path: './config.env' })
const app = require('./app')

// const dbURI = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
const dbURI = process.env.LOCAL_DATABASE_URI
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log('DB connection successful')
  })
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App listening at ${port}...`)
})

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message)
  console.log('UNHANLED REJECTION! Shuting down...')
  server.close(() => {
    process.exit(1)
  })
})
