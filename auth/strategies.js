//Strategies for username/password and Jwt endpoint authentication

const passport = require('passport');

//Strategy allows user to supply username/password to authenticate
//an endpoint
const LocalStrategy = require('passport-local').Strategy;
const {
    // Assigns the Strategy export to the name JwtStrategy using object
    // destructuring
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');
const {User} = require('../users/models');
const {JWT_SECRET} = require('../config');


const localStrategy = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
  },
  (username, password, callback) => {
  let user;
  User
    .findOne({username: username})
    .then(_user => {
      console.log(user);
      user = _user;
      if (!user) {
        // Return a rejected promise so we break out of the chain of .thens.
        // Any errors like this will be handled in the catch block.
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password',
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      console.log(!isValid);
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password',
        });
      }
      return callback(null, user)
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});

//Strategy allows user to supply Jwt to authenticate an endpoint
const jwtStrategy = new JwtStrategy({
    secretOrKey: JWT_SECRET,
    // Look for the JWT as a Bearer auth header
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    // Only allow HS256 tokens - the same as the ones we issue
    algorithms: ['HS256']
  },
  (payload, done) => {
    done(null, payload.user)
  }
);


module.exports = {localStrategy, jwtStrategy};
