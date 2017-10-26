// Mongoose user model 

// Import encryption and mongoose middleware
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Make mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// Define mongoose schema
const UserSchema = mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  username: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  snpVariant: {type: String}
});

// Create full name using mongoose virtual property
UserSchema.virtual('fullName').get(function() {
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

// Declare instance method for User model
UserSchema.methods.apiRepr = function() {
  return {
    name: this.fullName,
    username: this.username,
    snpVariant: this.snpVariant
  };
}

// Use mongoose method to compare user entered password
// with hashed value stored in user object
UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

// Use mongoose method to hash user entered password
UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

// Create mongoose user model variable
const User = mongoose.model('User', UserSchema);

// Export mongoose user model
module.exports = {User};