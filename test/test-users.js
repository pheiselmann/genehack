const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server.js');

const {User} = require('../users')
const {TEST_DATABASE_URL} = require('../config');

const should = chai.should();

chai.use(chaiHttp);

describe('Users API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  })

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('POST endpoint', function() {

    it('should return a user profile with right fields', function() {
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: 'robby', password: 'bobbyrobby', snpVariant: 'GG'};
      let resUser;
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'name', 'username', 'snpVariant');
          resUser = res.body;
          return User.find({username: resUser.username})

        })
        .then(function(profile) {
          resUser.name.should.contain(profile[0].name.firstName);
          resUser.name.should.contain(profile[0].name.lastName);
          resUser.username.should.equal(profile[0].username);
          resUser.snpVariant.should.equal(profile[0].snpVariant);
        });
    });
  });
});