const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');


const router = express.Router();


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
