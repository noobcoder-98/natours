const express = require('express')
const { isLoggedIn, protect } = require('../controllers/authController')
const {
  getTour,
  getLoginForm,
  getOverview,
  getAccount,
  updateUserData,
} = require('../controllers/viewController')

const router = express.Router()
router.get('/', isLoggedIn, getOverview)
router.get('/tour/:slug', isLoggedIn, getTour)
router.get('/login', isLoggedIn, getLoginForm)
router.get('/me', protect, getAccount)
router.get('/submit-user-data', updateUserData)
module.exports = router
