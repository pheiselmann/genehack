const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');

const router = express.Router();

const createAuthToken = user => {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

router.post(
    '/login',
    // The user provides a username and password to login
    passport.authenticate('local', {session: false}),
    (req, res) => {
        const authToken = createAuthToken(req.user.apiRepr());
        res.json({authToken});
    }
);

module.exports = {router};
