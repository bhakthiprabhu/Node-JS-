const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const getReq = require('./methods/getRequest');
const postReq = require('./methods/postRequest');
const updateReq = require('./methods/updateRequest');
const deleteReq = require('./methods/deleteRequest');

const user = require('./data/userDetails.json');

require('dotenv').config();

const PORT = process.env.PORT || 5001;
const app = express();

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to attach user data to the request
app.use((req, res, next) => {
    req.user = user;
    next();
});

// Define routes
app.get('/api/user', getReq);
app.get('/api/user/:id', getReq); 
app.post('/api/user', postReq);
app.put('/api/user', updateReq);
app.put('/api/user/:id', updateReq);
app.delete('/api/user', deleteReq);
app.delete('/api/user/:id', deleteReq);

// Handle 404 - Not Found
app.use((req, res) => {
    res.status(404).json({ title: "Not found", message: "Route not found" });
});

// Create HTTP server with Express app
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
