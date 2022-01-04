const express = require('express');
const cors = require('cors');
const auth = require('../middlewares/auth');
const cookieParser = require('cookie-parser');

function setupExpress(app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(auth());
}

module.exports = setupExpress;