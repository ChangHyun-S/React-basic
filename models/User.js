const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// saltrounds salt 글자수
const saltRounds = 10;

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
userSchema.pre('save', function(next) {
    var user = this

    if(user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
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

const User = mongoose.model('User', userSchema)

module.exports = {User}