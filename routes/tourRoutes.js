const express = require('express')
const {
  checkId,
  getAllTour,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkBody,
} = require('../controllers/tourController')

const router = express.Router()

router.param('id', checkId)

router.route('/').get(getAllTour).post(checkBody, createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
