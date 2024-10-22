const express = require('express')
const app =  express()

app.get('/api/v1/customer', (req,res) => {
    res.status(200).send("hello")
})

module.exports = app