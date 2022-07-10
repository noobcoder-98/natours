const express = require('express')
const {
  getAllTour,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} = require('../controllers/tourController')
const { protect, restrictTo } = require('../controllers/authController')

const router = express.Router()

router.route('/top-5-cheap').get(aliasTopTours, getAllTour)
router.route('/').get(protect, getAllTour).post(createTour)
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router
