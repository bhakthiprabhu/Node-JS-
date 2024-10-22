const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const authorize = require('./authorization-middleware')

app.get('/api/v1/user/token', (req,res) => {
    const payload = {
        name:"bhakthi",
        email:"bhakthi.prabhu@philips.com"
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
    res.status(200).send(token)
})

app.get('/api/v1/customer', authorize, (req,res) => {
    res.status(200).send('Hello Customer')
})
module.exports = app