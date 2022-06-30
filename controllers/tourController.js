const Tour = require('../models/tourModel')

exports.getAllTour = async (req, res) => {
  try {
    /** Build the query
     * 1. Filtering
     */
    const queryObj = { ...req.query }
    const excludedFields = ['page', 'limit', 'sort', 'fields']
    excludedFields.forEach((element) => {
      delete queryObj[element]
    })

    /**
     * 2. Advanced filtering
     */
    const queryString = JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    const query = Tour.find(JSON.parse(queryString))

    /** Execute the query */
    const tours = await query
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Unknown error',
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Unknown error',
    })
  }
}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Unknown error',
    })
  }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Unknown error',
    })
  }
}

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Unknown error',
    })
  }
}
