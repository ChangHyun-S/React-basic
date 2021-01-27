const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://lkisa5:1q2w3e4r@boilerplate.j4ppf.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!!!!!!!!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})