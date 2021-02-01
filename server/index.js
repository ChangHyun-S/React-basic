const express = require('express')
const app = express()
const port = 3000
const bodyPasrser = require("body-parser");
const cookieParser = require('cookie-parser')
const { User } = require("./models/User");
const { auth } = require("./middleware/auth")
const config = require('./config/key')

// application/x-www-form-urlencoded 
app.use(bodyPasrser.urlencoded({ extended: true }));

// application/json 분석해서 가져오는거
app.use(bodyPasrser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const { request } = require('express');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!!!!!!!!!!!!!!!test123123')
})


// register route
app.post("/api/users/register", (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다."
      })
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        })
      }

      // 비밀번호까지 맞다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)

        // 토큰을 쿠키에 저장
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

// middleware의 auth 사용하는거
app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어 통과했다면 auth = ture임
  res.status(200).json({
    // auth.js에서 request에 user를 넣었기 때문에 가능
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image

  })
})

app.get('/api/users/logout', auth, (req, res) => {
  // 유저를 찾아서 데이터 업데이트
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})