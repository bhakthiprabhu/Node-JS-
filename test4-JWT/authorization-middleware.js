const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).send("invalid token! Access Denied!")
    }
    const tokenbody = req.headers.authorization.split(' ')[1]
    jwt.verify(tokenbody,process.env.JWT_SECRET_KEY,(err,decoded) => {
        if(err){
            console.log(err)
            return res.status(401).send("invalid token! Access Denied!")
        }
        req.user = decoded.user
        next()
    })
    next()
}