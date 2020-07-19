const express = require('express')
const router = express.Router()

const authenticate = (req, res, next) => {
  res.send([1, 2, 3, 4])
}

router.get('/', authenticate)

module.exports = router
