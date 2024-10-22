const validateRandomId = require('../util/validate-random-id')

module.exports = (req, res) => {
    try{
        if (req.url === "/api/user") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.user));
        } else {
            let filteredUser = req.user.filter( (user) => {
                return user.user_id === validateRandomId(req,res)
            })
            if (filteredUser.length > 0) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(filteredUser));
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ title: "Not found", message: "User not found" }));
            }
        } 
    } catch (err) {
        console.error('Error:', err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation failed", message: "Request body is not valid" }));
    }
};
