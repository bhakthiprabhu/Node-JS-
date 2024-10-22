const express = require('express')
let app = express()

const userRouter =  require('./routes/userRoutes')

//if development env then only log data
if(process.env.NODE_env === 'development'){
    //middleware - morgan - HTTP request logger.
    const morgan = require('morgan')
    app.use(morgan('dev')) //log the data
}

// middleware - custom middleware
app.use((req,res,next) =>{
    console.log("custom middleware")
    req.requestedAt = new Date().toISOString()
    next()
})

//middleware - express - add the request body to the request object
app.use(express.json())

//mouting routes
app.use('/api/v1/user',userRouter)

module.exports = app