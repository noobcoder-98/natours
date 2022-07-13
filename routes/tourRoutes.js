const express = require('express')
const {
  getAllTour,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getMonthlyPlan,
} = require('../controllers/tourController')
const { protect, restrictTo } = require('../controllers/authController')
const reviewRouter = require('./reviewRoutes')

const router = express.Router()
router.use('/:tourId/reviews', reviewRouter)
router.get('/top-5-cheap', aliasTopTours, getAllTour)
router.get('/monthly-plan/:year', protect, restrictTo('admin','lead-guide', 'guide'), getMonthlyPlan)
router.route('/').get(protect, getAllTour).post(protect, restrictTo('admin','lead-guide'), createTour)
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'),updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router
