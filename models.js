const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema({
  //eventually change this to first/last names scheme
  name: {
    firstName: String,
    lastName: String
  },
  //name: {type: String},
  username: {type: String, required: true},
  password: {type: String, required: true},
  snpVariant: {type: String},
  report: {type: String}
});

//eventually use this for first/last name scheme
userProfileSchema.virtual('fullName').get(function() {
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

userProfileSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.fullName,
    username: this.username,
    snpVariant: this.snpVariant,
    report: this.report
  };
}

const User = mongoose.model('User', userProfileSchema);

module.exports = {User};