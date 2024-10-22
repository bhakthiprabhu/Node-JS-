const writeToFile = require('../util/write-to-file');
const generateRandomId = require('../util/generate-random-id');

module.exports = (req, res) => {
    try {
        const data = req.body;
        data.user_id = generateRandomId()
        req.user.push(data)
        writeToFile(req.user)
        res.writeHead(201, { "Content-Type": "application/json" })
        res.end(JSON.stringify(req.user));
    } catch (err) {
        console.error('Error:', err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation failed", message: "Request body is not valid" }));
    }
};