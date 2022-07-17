const express = require('express')
const { getTour } = require('../controllers/viewController')
const { getOverview } = require('../controllers/viewController')

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).render('base', {
    title: 'haha'
  })
})

router.get('/overview', getOverview)

router.get('/tour/:slug', getTour)

module.exports = router