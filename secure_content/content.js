const express = require('express')
const auth = require('./../middleware/auth')
const admin = require('./../middleware/admin')

const router = express.Router()

router.get('/', auth, (req, res) => {
  res.send('Secure content here...')
})

router.post('/', auth, (req, res) => {
  const secure = req.body

  res.send(secure)
})

router.get('/delete', [auth, admin], (req, res) => {
  res.send('This content has been deleted.')
})

module.exports = router
