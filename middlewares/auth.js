const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function () {
    return(req, res, next) => {
        let token = req.cookies[process.env.COOKIE_SESSION_NAME];

        if(token) {
            jwt.verify(token, process.env.COOKIE_SESSION_NAME, function (err, decoded){
                if(err) {
                    res.clearCookie(process.env.COOKIE_SESSION_NAME);
                } else {
                    req.user = decoded;
                    res.local.user = decoded;
                    res.local.isAuthenticated = true;
                    res.local.isOrganization = decoded.isOrganization;
                }
            })
        }

        next();
    }
}