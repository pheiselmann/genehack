// require middleware
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');

// create new Express router instance
const router = express.Router();

// create Jwt, including info re user in payload
const createAuthToken = user => {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

// Use localStrategy to protect login endpoint
router.post(
    '/login',
    //  The user provides a username and password to login
    passport.authenticate('local', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user.apiRepr());
        res.json({authToken});
    }
);

// export router instance
module.exports = {router};
