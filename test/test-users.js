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
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: 'snobbyrobby', password: 'bobbyrobby', snpVariant: 'GG'};
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

    it('should reject a user profile with username already in use', function() {
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: 'snobbyrobby', password: 'bobbyrobby', snpVariant: 'GG'};
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Username already taken","location":"username"}');
        });   
    });

    it('should reject a user profile with wrong snpVariant', function() {
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: 'snabbyrabby', password: 'bobbyrobby', snpVariant: 'BB'};
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Incorrect snpVariant","location":true}');
        });
    });

    it('should reject a user profile with username less than 1 character', function() {
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: '', password: 'bobbyrobby', snpVariant: 'GG'};
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Must be at least 1 characters long","location":"username"}');
        });
    });

    it('should reject a user profile with password less than 10 characters', function() {
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: 'snubbyrubby', password: 'bobby', snpVariant: 'GG'};
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Must be at least 10 characters long","location":"password"}');
        });
    });

    it('should reject a user profile with password more than 72 characters', function() {
      let pword = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: 'snibbyribby', password: pword, snpVariant: 'GG'};
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Must be at most 72 characters long","location":"password"}');
        });
    });

    it('should reject a user profile with password beginning with whitespace', function() {
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: 'snoobbyroobby', password: ' bobbyrobby', snpVariant: 'GG'};
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Cannot start or end with whitespace","location":"password"}');
        });
    });

    it('should reject a user profile with password ending with whitespace', function() {
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: 'snaabbyraabby', password: 'bobbyrobby ', snpVariant: 'GG'};
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Cannot start or end with whitespace","location":"password"}');
        });
    });

    it('should reject a user profile with username beginning with whitespace', function() {
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: ' sneebbyreebby', password: 'bobbyrobby', snpVariant: 'GG'};
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Cannot start or end with whitespace","location":"username"}');
        });
    });

    it('should reject a user profile with username ending with whitespace', function() {
      let newUser = {firstName: 'Bob', lastName: 'Roberts', username: 'sneebbyreebby ', password: 'bobbyrobby', snpVariant: 'GG'};
      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function(res) {
          console.log("hello?")
          console.log(JSON.stringify(response.responseJSON));
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Cannot start or end with whitespace","location":"username"}');
        });
    });
  });
});