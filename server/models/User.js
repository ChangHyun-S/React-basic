const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { request } = require('express');
// saltrounds salt 글자수
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 빈칸 제거기능
        unique: 1 // 중복 방지
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 관리자, 일반 유저 세팅
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// user.save 전 실행
userSchema.pre('save', function (next) {
    var user = this

    if (user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                // hash 비밀번호로 변경
                user.password = hash
                next()
            })
        })
    }
    else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    // plainPassword
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this
    // jsonwebtoken 이용해서 token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    // 토큰 decode
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디 이용해서 유저를 찾은 뒤
        // 클라이언트에서 가져온 토큰과 DB 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }