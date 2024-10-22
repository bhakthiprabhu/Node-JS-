const { readFileSync } = require('fs');
const http = require('http')

let data = readFileSync('./data/data.json','utf-8')
let userDetails = JSON.parse(data)

const server = http.createServer((req,res)=>{
    //request(req) has the user entered url value
    let path = req.url;
    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        res.writeHead(200)
        res.end("Home Page")
    }
    else if(path.toLocaleLowerCase() == '/about'){
        res.writeHead(200)
        res.end("About Page")
    }
    else if(path.toLocaleLowerCase() == '/userdetails'){
        res.writeHead(200,{
            'content-type':'application/json'
        })
        res.end("<h1>User details Page</h1>")
        console.log(userDetails)
    }
    else{
        res.writeHead(404)
        res.end("Error 404: Page not found")
    }
})
server.listen(8000,'127.0.0.1',()=>{
    console.log("server started")
})