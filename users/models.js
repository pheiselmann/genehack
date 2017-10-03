const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

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
  //report: {type: String}
});

UserSchema.virtual('fullName').get(function() {
  // return `${this.name.firstName} ${this.name.lastName}`.trim();
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

UserSchema.methods.apiRepr = function() {
  return {
    //id: this._id,
    name: this.fullName,
    username: this.username,
    snpVariant: this.snpVariant
    //report: this.report
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};