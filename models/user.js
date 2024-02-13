const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
})

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6).max(255)
    })

    return schema.validate(user)
}

module.exports = {
    User, validateUser
}