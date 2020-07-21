const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  isAdmin: Boolean,
})

schema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  )
  return token
}

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id
    delete ret.hash
  },
})

module.exports = mongoose.model('User', schema)
