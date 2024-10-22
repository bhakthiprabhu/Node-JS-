module.exports = (req,res) =>{
    //http://localhost:5000/api/user/543c5484cb79a5fe593425a9
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1); // /api/users/
    let id = req.url.split("/")[3]; //[''api', 'user', '543c5484cb79a5fe593425a9']
    const regexp = new RegExp(/^[a-f0-9]{24}$/)

    if (!regexp.test(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation failed", message: "User ID not valid" }));
    }
    else if (baseUrl === "/api/user/" && regexp.test(id)) {
        return id
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not found", message: "Route not found" }));
    }
}

