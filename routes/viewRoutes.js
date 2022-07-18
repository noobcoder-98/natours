const express = require('express')
const { getTour, getLoginForm, getOverview } = require('../controllers/viewController')

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).render('base', {
    title: 'haha'
  })
})

router.get('/overview', getOverview)
router.get('/tour/:slug', getTour)
router.get('/login', getLoginForm)

module.exports = router