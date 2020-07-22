const User = require('./user.model')
const bcrypt = require('bcrypt')

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
  async update(id, userParam) {
    const user = await User.findById(id)

    if (!user) throw 'User not found'

    if (
      user.username !== userParam.username &&
      (await User.findOne({ username: userParam.username }))
    ) {
      throw `Username ${userParam.username} is already taken`
    }

    if (userParam.password) {
      userParam.hash = bcrypt.hash(userParam.password, 10)
    }

    Object.assign(user, userParam)

    await user.save()
  },
  async delete(id) {
    return User.findOneAndRemove(id)
  },
}
