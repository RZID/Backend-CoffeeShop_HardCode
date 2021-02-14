const jwt = require('jsonwebtoken');
const { failed } = require('../response')
module.exports = {
    authentication: (req, res, next) => {
        const header = req.headers;
        if (!header.token) {
            failed(res, 'Login required', {})
        } else {
            jwt.verify(header.token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    failed(res, 'Invalid token', err)
                } else {
                    res.userAccess = decoded.access
                    next()
                }
            })
        }
    },
    adminAuthorization: (req, res, next) => {
        const access = res.userAccess;
        if (access === 0) {
            next();
        } else {
            failed(res, 'Error Authorization', {})
        }
    },
    userAuthorization: (req, res, next) => {
        const access = res.userAccess;
        if (access === 1) {
            next();
        } else {
            failed(res, 'Error Authorization', {})
        }
    }
}