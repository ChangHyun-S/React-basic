const express = require('express')
const app = express()
const port = 3000
const bodyPasrser = require("body-parser");
const { User } = require("./models/User");

// application/x-www-form-urlencoded 
app.use(bodyPasrser.urlencoded({extended: true}));
// application/json 분석해서 가져오는거
app.use(bodyPasrser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://lkisa5:1q2w3e4r@boilerplate.j4ppf.mongodb.net/boilerplate?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!!!!!!!!!test123123')
})


  
app.post("/register",(req, res)=> {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다
  const user = new User(req.body)

  user.save((err, userInfo)=> {
      if (err) return res.json({success: false, err})
      return res.status(200).json({
        success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})