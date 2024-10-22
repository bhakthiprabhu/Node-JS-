const writeToFile = require('../util/write-to-file');
const validateRandomId = require('../util/validate-random-id')

module.exports = (req, res) => {
    try{
        const index = req.user.findIndex( (user) =>{
            return user.user_id === validateRandomId(req,res)
        })
        if (index === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Not Found", message: "user Not found" }));
        }
        else{
            //Array method to replace existing or add new one
            //splice(start, deleteCount, item1, item2, /* …, */ itemN)
            //remove 1 element at index specified
            req.user.splice(index,1)
            writeToFile(req.user)
            res.writeHead(204,{ "Content-Type": "application/json" })
            res.end(JSON.stringify({ title: "Success", message: "user deleted" }));
        }
    } catch (err) {
        console.error('Error:', err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation failed", message: "Request body is not valid" }));
    }
};
