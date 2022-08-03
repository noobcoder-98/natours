const Tour = require('../models/tourModel')
const User = require('../models/userModel')
const Booking = require('../models/bookingModel')
const AppError = require('../utils/appError')
const { catchAsync } = require('../utils/catchAsync')

exports.alerts = (req, res, next) => {
  const {alert} = req.query;
  if (alert === 'booking') {
    res.local.alert = `Your booking was successfully! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.`
  }
  next()
}

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. Get tour data from collection
  const tours = await Tour.find()
  // 2. Build template

  // 3. Render that template using tour data from 1.
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  })
})

/**
 * 1. Get the data for the requested tour (including reviews and guides)
 * 2. Build the template
 * 3. Render template using data form 1.
 */
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  })
  if (!tour) {
    return next(new AppError('There is no tour with that name', 404))
  }
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('tour', {
      title: `${tour.title} Tour`,
      tour,
    })
})

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  })
})

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your Account',
  })
})

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1. Find all tours
  const bookings = await Booking.find({ user: req.user.id })

  // 2. Find tours with the returned Ids
  const tourIds = bookings.map((e) => e.tour)
  const tours = await Tour.find({ _id: { $in: tourIds } })

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  })
})

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  )

  res.status(200).render('account', {
    title: 'Your Account',
    user: updatedUser,
  })
})
