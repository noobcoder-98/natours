const fs = require('fs')

const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const mongoose = require('mongoose')
const Tour = require('../../models/tourModel')

// const dbUri = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
const dbURILocal = process.env.DATABASE_LOCAL.replace('<password>', process.env.DATABASE_PASSWORD_LOCAL)

mongoose
  .connect(dbURILocal, {
    useNewUrlParser: true,
  })
  .then((conn) => console.log('DB connection successful'))

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))

/** Import data */
const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully loaded!')
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

/** Delete all  */
const deleteAll = async () => {
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
