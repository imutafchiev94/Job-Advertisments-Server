const express = require('express');
const cors = require('cors');
const auth = require('../middlewares/auth');

function setupExpress(app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(auth());
}

module.exports = setupExpress;