const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, validateUser } = require('../models/user')

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_KEY)
}

module.exports.signUp = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    const { email, password } = req.body
    let user = await User.findOne({ email: email })
    if (user) return res.status(400).json('user already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({
        email,
        password: hashedPassword
    })

    try {
        user = await user.save()
        const token = await generateToken({ email: user.email, id: user._id })
        return res.status(201).json(token)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.signIn = async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json('Invalid email or password')

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) return res.status(400).json('Invalid email or password')

        const token = await generateToken({ email: user.email, id: user._id })

        return res.status(200).json(token)
    } catch (error) {
        console.log(error.message)
    }


}

