const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');

const createAuthToken = user => {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
  //store locally
  // localStorage.setItem('currentUser', user.username);

};

const router = express.Router();

router.post('/login',
  // The user provides a username and password to login
  passport.authenticate('basic', {session: false}),
  (req, res) => {
    const authToken = createAuthToken(req.user.apiRepr());
    //const token = {'token': localStorage.getItem('token')};
    res.json({authToken});
    //res.json(token);
    //CANT PUT TOKEN IN LOCAL STORAGE ON SERVER SIDE
  }
);

router.post('/refresh',
  // The user exchanges an existing valid JWT for a new one with a later
  // expiration
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({authToken});
  }
);

module.exports = {router};
