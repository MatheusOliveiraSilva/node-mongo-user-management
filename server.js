const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.')
  process.exit(1)
}

const app = express()

const users = require('./users/user.controller')
const secure = require('./secure_content/content')

app.use(express.json())

app.use('/users', users)
app.use('/secure', secure)

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

mongoose.connect('mongodb://localhost/node-mongo-user-management', options)

const port = process.env.PORT || 1331
app.listen(port, () => console.log(`Server listening on port ${port}`))
