const jwt = require('jsonwebtoken');

const { jwtPassword } = require('../config/environment');

module.exports = (payload, validTill) => { 
    return jwt.sign({...payload, validTill: new Date().getTime() + validTill }, jwtPassword, { expiresIn: validTill.toString() })
};