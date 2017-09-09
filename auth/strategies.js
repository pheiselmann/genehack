const passport = require('passport');
const {
    // Assigns the Strategy export to the name JwtStrategy using object
    // destructuring
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_to_new_variable_names
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');

const {User} = require('../users/models');
const {JWT_SECRET} = require('../config');

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

module.exports = {jwtStrategy};
