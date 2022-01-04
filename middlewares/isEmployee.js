module.exports = (req, res, next) => {
    if(!req.user) {
        res.status(401).end();
    } else if (req.isOrganization) {
        res.status(403).end();
    }
    next();
}