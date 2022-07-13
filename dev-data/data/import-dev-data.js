const fs = require('fs')

const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const mongoose = require('mongoose')
const Tour = require('../../models/tourModel')
const User = require('../../models/userModel')
const Review = require('../../models/reviewModel')

// const dbURI = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
const dbURI = process.env.LOCAL_DATABASE_URI
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
  })
  .then((conn) => console.log('DB connection successful'))

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'))

/** Import data */
const importData = async () => {
  try {
    await Tour.create(tours)
    await User.create(users, {validateBeforeSave: false})
    await Review.create(reviews)
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
    await User.deleteMany()
    await Review.deleteMany()
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
