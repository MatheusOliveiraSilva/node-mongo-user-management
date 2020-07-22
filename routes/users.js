const express = require('express')
const userController = require('./../users/user.controller')
const auth = require('./../middleware/auth')
const admin = require('./../middleware/admin')

const router = express.Router()

router.post('/authenticate', userController.authenticate)
router.post('/register', userController.register)
router.put('/:id', auth, userController.update)
router.get('/me', auth, userController.getCurrent)
router.get('/', auth, userController.getAll)
router.get('/:id', auth, userController.getById)
router.delete('/:id', [auth, admin], userController._delete)

module.exports = router
