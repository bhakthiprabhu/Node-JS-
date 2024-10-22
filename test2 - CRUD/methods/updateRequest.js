const writeToFile = require('../util/write-to-file');
const validateRandomId = require("../util/validate-random-id");

module.exports = (req, res) => {
    try {
        const user_id = validateRandomId(req,res)
        const data = req.body;
        const index = req.user.findIndex( (user) =>{
            return user.user_id === user_id
        })
        if (index === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Not Found", message: "user Not found" }));
        }
        else{
            req.user[index] = {user_id, ...data}
            writeToFile(req.user)
            res.writeHead(204,{ "Content-Type": "application/json" })
            res.end(JSON.stringify({ title: "Success", message: "user updated" }));
        }
    } catch (err) {
        console.error('Error:', err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation failed", message: "Request body is not valid" }));
    }
};
