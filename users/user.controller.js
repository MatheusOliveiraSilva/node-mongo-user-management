const userService = require('./user.service')

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

const getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id)
    user ? res.send(user) : res.sendStatus(404)
  } catch (err) {
    next(err)
  }
}

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll()
    res.send(users)
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    userService.update(req.params.id, req.body)
    res.send('Updated sucessfully')
  } catch (err) {
    next(err)
  }
}

const _delete = async (req, res, next) => {
  try {
    userService.delete(req.params.id)
    req.send('Deleted sucessfully')
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticate,
  register,
  getCurrent,
  getAll,
  getById,
  update,
  _delete,
}
