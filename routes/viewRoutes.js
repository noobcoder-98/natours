const express = require('express')
const { isLoggedIn, protect } = require('../controllers/authController')
const {
  getTour,
  getLoginForm,
  getOverview,
  getAccount,
  updateUserData,
  getMyTours,
  alert
} = require('../controllers/viewController')

const router = express.Router()
router.use(alert)
router.get('/', isLoggedIn, getOverview)
router.get('/tour/:slug', isLoggedIn, getTour)
router.get('/login', isLoggedIn, getLoginForm)
router.get('/me', protect, getAccount)
router.get('/my-tours', protect, getMyTours)
router.post('/submit-user-data', protect, updateUserData)
module.exports = router
