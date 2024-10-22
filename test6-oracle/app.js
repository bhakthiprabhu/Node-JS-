const express = require('express');
const app = express();

const createTable = require('./db').createTable; 

app.get('/api/v1/db', createTable, (req, res) => {
    res.send('Hello World');
});

module.exports = app;
