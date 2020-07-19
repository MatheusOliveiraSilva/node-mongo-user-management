const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  username: {},
  hash: {},
  firstName: {},
  lastName: {},
  createdDate: {},
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id
    delete ret.hash
  },
})

module.exports = mongoose.model('User', schema)
