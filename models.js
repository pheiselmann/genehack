const mongoose = require('mongoose');

const userProfileSchema = mongoose.Schema({
  //eventually change this to first/last names scheme
  // name: {
  //   firstName: String,
  //   lastName: String
  // },
  name: {type: String},
  username: {type: String, required: true},
  password: {type: String, required: true},
  snpVarient: {type: String},
  report: {type: String}
});

//eventually use this for first/last name scheme
// userProfileSchema.virtual('authorName').get(function() {
//   return `${this.author.firstName} ${this.author.lastName}`.trim();
// });

userProfileSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    password: this.password,
    snpVariant: this.snpVariant,
    report: this.report
  };
}

const User = mongoose.model('User', userProfileSchema);

module.exports = {User};