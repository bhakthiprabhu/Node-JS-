const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = require('./app') //app.js

const port = process.env.PORT || 3000

//create server
app.listen(port, () =>{
    console.log('Server is running on port 3000')
})