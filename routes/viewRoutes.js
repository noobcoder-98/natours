const express = require('express')
const { isLoggedIn } = require('../controllers/authController')
const { getTour, getLoginForm, getOverview } = require('../controllers/viewController')

const router = express.Router()
router.use(isLoggedIn)
router.get('/', getOverview)
router.get('/tour/:slug', getTour)
router.get('/login', getLoginForm)

module.exports = router