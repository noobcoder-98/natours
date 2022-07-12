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

const router = express.Router()

router.get('/top-5-cheap', aliasTopTours, getAllTour)
router.get('/monthly-plan/:year', getMonthlyPlan)
router.route('/').get(protect, getAllTour).post(createTour)
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour)

module.exports = router
