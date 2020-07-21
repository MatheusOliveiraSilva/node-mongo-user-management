const express = require('express')
const userService = require('./user.service')
const router = express.Router()
const auth = require('../middleware/auth')

const authenticate = async (req, res, next) => {
  try {
    const user = await userService.authenticate(req.body)

    user
      ? res.send(user)
      : res.status(400).send('Username or password is incorrect')
  } catch (err) {
    next(err)
  }
}

const register = async (req, res, next) => {
  try {
    const token = await userService.create(req.body)

    res.header('x-auth-token', token).send('User created sucessfully.')
  } catch (err) {
    next(err)
  }
}

const getCurrent = async (req, res, next) => {
  try {
    const user = await userService.getById(req.user._id)
    user ? res.send(user) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
}

router.post('/authenticate', authenticate)
router.post('/register', register)
router.get('/me', auth, getCurrent)

module.exports = router
