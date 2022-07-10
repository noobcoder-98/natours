const User = require("../models/userModel")
const AppError = require("../utils/appError")
const { catchAsync } = require("../utils/catchAsync")

const filterObj = (obj, ...allowFields) => {
  const newObj = {}
  Object.keys(obj).forEach(e => {
    if (allowFields.includes(e)) newObj[e] = obj[e]
  })
  return newObj
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({
    status: 'success', 
    data: {
      users
    }
  })
})

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTed password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Please use /updatePassword', 400))
  }
  // 2. Update user document
  const filterBody = filterObj(req.body, 'name', 'email')
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true, 
    runValidators: true
  })
  res.status(200).json({
    status: 'success',
    data: updatedUser
  })
})

exports.deleteMe = catchAsync(async(req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {active: false})
  res.status(204).json({
    status: 'success', 
    data: null
  })
})

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error', 
    message: 'This route is not yet defined'
  })
}

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error', 
    message: 'This route is not yet defined'
  })
}

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error', 
    message: 'This route is not yet defined'
  })
}

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error', 
    message: 'This route is not yet defined'
  })
}