const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
const db_uri = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log('DB connection successful')
  })
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App listening at ${port}...`)
})
