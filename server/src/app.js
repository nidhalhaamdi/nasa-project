const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(morgan('combined')); // a middleware for logging requests

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serving the frontend

app.use('/v1', api);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;