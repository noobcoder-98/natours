const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const Tour = require('../../models/tourModel')
const mongoose = require('mongoose')
const db_uri = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
  })
  .then((conn) => console.log('DB connection successful'))

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

/** Import data */
const importData = async() => {
  try {
    await Tour.create(tours)
    console.log('Data successfully loaded!')
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

/** Delete all  */
const deleteAll = async() => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted!')
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteAll()
}

console.log(process.argv)
