const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkId = (req, res, next, val) => {
  console.log(`id: ${val}`)
  if (val > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }
  next()
}

exports.checkBody = (req, res, next) => {
  if(!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    })
  }
  next()
}

exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  })
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find((e) => e.id === id)

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = { id: newId, ...req.body }
  tours.push(newTour)
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    })
  })
}

exports.updateTour = (req, res) => {
  const id = req.params.id * 1
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '...',
    },
  })
}

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    })
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
}
