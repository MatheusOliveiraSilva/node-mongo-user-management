const User = require('./user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = {
  async authenticate({ username, password }) {
    const user = await User.findOne({ username })
    if (user && (await bcrypt.compare(password, user.hash))) {
      const token = user.generateAuthToken()

      return {
        ...user.toJSON(),
        token,
      }
    }
  },
  async getAll() {
    return await User.find()
  },
  async getById(id) {
    return await User.findById(id).select('-hash')
  },
  async create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
      throw `Username "${userParam.username}" is already taken...`
    }

    const user = new User(userParam)

    if (userParam.password) {
      user.hash = await bcrypt.hash(userParam.password, 10)
    }

    await user.save()

    const token = user.generateAuthToken()

    return token
  },
  async update() {},
  async delete(id) {
    return User.findOneAndRemove(id)
  },
}
