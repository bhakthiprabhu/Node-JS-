const fs = require('fs')
let user = JSON.parse(fs.readFileSync('./data/userDetails.json'))

//middleware - custom middleware - check forparameter exist or not
exports.checkId = (req,res,next,value) => {
    let matchid = user.find(el => +el.user_id === value*1);

    if (!matchid) {
        return res.status(404).json({
            status: "error",
            message: `User ${value} not found`
        });
    }

    next()
}

//middleware - custom middlware - check for request body
exports.validateBody = (req,res,next) => {
    if(!req.body.email || !req.body.name){
        return res.status(400).json({
            status: "error",
            message: "Please provide email and name"
        })
    }

    next()
}

exports.getusers = (req,res) =>{
    //JSend Json formatting
    return res.status(200).json({ //list request
        status:"success",
        count: Object.keys(user).length,
        requestedAt: req.requestedAt,
        data:{
            user:user
        }
    })
}

exports.getuserbyid = (req,res) =>{
    const getid = req.params.id * 1

    let usermatch = user.find(el => +el.user_id === getid);

    return res.status(200).json({
        status: "success",
        data: {
            user: usermatch
        }
    });
}

exports.postuser =  (req,res) =>{
    //request object
    //console.log(req.body) //undefined - add middleware - app.use(express.json()) to fix this 
    const newid = Number(user[Object.keys(user).length - 1].user_id) + 1

    const newuser = Object.assign({user_id:newid},req.body)

    user.push(newuser)

    fs.writeFile('./data/userDetails.json',JSON.stringify(user),()=>{
        res.status(201) //new request
        return res.json({
            status:"success",
            data:{
                user:newuser
            }
        })
    })
}

exports.updateuser = (req,res) =>{
    let updateid = req.params.id * 1

    let userupdate = user.find(el => +el.user_id === updateid)

    let index = user.indexOf(userupdate)

    //merge 2 objects using assign funcn
    Object.assign(userupdate,req.body)

    user[index] = userupdate

    fs.writeFile('./data/userDetails.json',JSON.stringify(user),(err) =>{
        return res.status(200).json({
            status:"success",
            data: {
                user:userupdate
            }
        })
    })
}

exports.deleteuser =  (req,res) =>{
    let delid = req.params.id * 1

    let userdelete = user.find(el => +el.user_id === delid)

    let index = user.indexOf(userdelete)
    user.splice(index,1)

    fs.writeFile('./data/userDetails.json',JSON.stringify(user),(err) =>{   
        return res.status(204).json({
            status:"success",
            data: {
                user:null
            }
        }) 
    })  
}