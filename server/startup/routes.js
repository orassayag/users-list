const express = require('express');
const cors = require('cors');
const users = require('../routes/users');
const error = require('../middleware/error');

// Define all routes of the API and error handling middleware.
module.exports = (app) => {

    // Cors.
    app.use(cors());
    app.options('*', cors());

    // Routes.
    app.use(express.json());
    app.use('/api/users', users);

    // Error handling middleware.
    app.use(error);
};