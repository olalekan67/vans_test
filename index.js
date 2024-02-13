require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const app = express()

// middlewares
app.use(express.json())
app.use(cors('*'))
app.use('/api/users', userRoute)


const mongoDbUri = process.env.MANGODB_URI
const port = 3000

// mongoose.connect(mongoDbUri)

// const conn = mongoose.connection
// conn.once('open', () => {
//     console.log('connected to mongodb successfully')
// })

// conn.on('error', () => {
//     console.log('Failed to connect to mongodb')
// })

// app.listen(port, () => {
//     console.log(`Listening on PORT ${port}`)
// })

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(mongoDbUri)
        app.listen(port, () => {
            console.log(`Listening on PORT ${port}`)
        })
        console.log('connected to mongodb successfully')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDb()

