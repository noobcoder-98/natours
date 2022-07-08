exports.catchAsync = (func) => (req, res, next) => {
  func(req, res, next).catch(next)
}