const sharp = require('sharp')
const multer = require('multer')
const User = require('../models/userModel')
const AppError = require('../utils/appError')
const { catchAsync } = require('../utils/catchAsync')
const factory = require('./handlerFactory')

// const multerStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'public/img/users')
//   },
//   filename: (req, file, callback) => {
//     const extension = file.mimetype.split('/')[1]
//     callback(null, `user-${req.user.id} - ${Date.now()}.${extension}`)
//   },
// })
const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true)
  } else {
    callback(new AppError('Not an image. Please upload only images!', 400), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

exports.uploadUserPhoto = upload.single('photo')

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next()
  req.file.filename = `user-${req.user.id} - ${Date.now()}.jpeg`
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`)
  next()
})

const filterObj = (obj, ...allowFields) => {
  const newObj = {}
  Object.keys(obj).forEach((e) => {
    if (allowFields.includes(e)) newObj[e] = obj[e]
  })
  return newObj
}

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id
  next()
}

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTed password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError('This route is not for password updates. Please use /updatePassword', 400)
    )
  }
  // 2. Update user document
  const filterBody = filterObj(req.body, 'name', 'email')
  if (req.file) filterBody.photo = req.file.filename

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    data: updatedUser,
  })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })
  res.status(204).json({
    status: 'success',
    data: null,
  })
})

exports.getUser = factory.createOne(User)

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined. Please use /signup instead',
  })
}

exports.getAllUsers = factory.getAll(User)

// Do not update password with this
exports.updateUser = factory.updateOne(User)

exports.deleteUser = factory.deleteOne(User)
