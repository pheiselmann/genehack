// Express router 

// Import express router, as well as 
// body-parser and passport middleware
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

// Import mongoose user model
const {User} = require('./models');

// Create router and body-parser variables
const router = express.Router();
const jsonParser = bodyParser.json();


//  Post to register a new user
router.post('/', jsonParser, (req, res) => {

  const incorrectVariant =
    ('snpVariant' in req.body) && 
    !(req.body['snpVariant'] === '' || 
      req.body['snpVariant'] === 'TT' || 
      req.body['snpVariant'] === 'GT' || 
      req.body['snpVariant'] === 'GG');


  if (incorrectVariant) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect snpVariant',
      location: incorrectVariant
    });
  }

  //  If the username and password aren't trimmed we give an error.  Users might
  //  expect that these will work without trimming (i.e. they want the password
  //  "foobar ", including the space at the end).  We need to reject such values
  //  explicitly so the users know what's happening, rather than silently
  //  trimming them and expecting the user to understand.
  //  We'll silently trim the other fields, because they aren't credentials used
  //  to log in, so it's less of a problem.
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(field =>
    req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 10,
      //  bcrypt truncates after 72 characters, so let's not give the illusion
      //  of security by storing extra (unused) info
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(field =>
    'min' in sizedFields[field] &&
    req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(field =>
    'max' in sizedFields[field] &&
    req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField ?
        `Must be at least ${sizedFields[tooSmallField].min} characters long` :
        `Must be at most ${sizedFields[tooLargeField].max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {username, password, firstName='', lastName='', snpVariant} = req.body;
  //  Username and password come in pre-trimmed, otherwise we throw an error
  //  before this
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User
    .find({username})
    .count()
    .then(count => {
      if (count > 0) {
        //  There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      //  If there is no existing user, hash the password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          username,
          password: hash,
          name: {
          firstName,
          lastName},
          snpVariant
        })
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      //  Forward validation errors on to the client, otherwise give a 500
      //  error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

// Export express router
module.exports = {router};
