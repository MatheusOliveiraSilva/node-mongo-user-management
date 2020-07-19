const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.use('/api', (req, res) => {
  res.send([1, 3, 3, 1])
})

app.use('/users', require('./users/user.controller'))

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect('mongodb://localhost/node-mongo-user-management', options)

const port = process.env.PORT || 1331
app.listen(port, () => console.log(`Server listenning on port ${port}`))
