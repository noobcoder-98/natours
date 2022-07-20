const express = require('express')
const {
  getAllTour,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getMonthlyPlan,
  getTourWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require('../controllers/tourController')
const { protect, restrictTo } = require('../controllers/authController')
const reviewRouter = require('./reviewRoutes')

const router = express.Router()
router.use('/:tourId/reviews', reviewRouter)
router.get('/top-5-cheap', aliasTopTours, getAllTour)
router.get(
  '/monthly-plan/:year',
  protect,
  restrictTo('admin', 'lead-guide', 'guide'),
  getMonthlyPlan
)
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(getTourWithin)
router.route('/distances/:latlng/unit/:unit').get(getDistances)
router
  .route('/')
  .get(protect, getAllTour)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour)
router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), uploadTourImages, resizeTourImages, updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router
