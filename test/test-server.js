// Tests for GET request displays of html pages

// Import middleware for http request and mongoose modeling
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// Import express app and server functions
const {app, runServer, closeServer} = require('../server.js');
// Import mongoose user model
const {User} = require('../users')
// Import test database url
const {TEST_DATABASE_URL} = require('../config');

// Create should variable for appending message 
// to failed assertions
const should = chai.should();

//  This let's us make http requests
//  in our tests.
chai.use(chaiHttp);

// Describe behavior expected from GET requests for html pages
describe('HTML resources', function() {

  // Run server before each describe block below
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
 
  // Close server after each describe bloc below
  after(function() {
    return closeServer();
  })

// Describe expected behavior of GET calls to home, login, 
// create-account, profile, edit account and review html pages
  describe('html pages', function() {

    it('home page exists', function() {
      return chai.request(app)
        .get('/')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.html;
        });
    });

    it('login page exists', function() {
      return chai.request(app)
        .get('/login')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.html;
        });
    });

    it('create-account page exists', function() {
      return chai.request(app)
        .get('/create-account')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.html;
        });
    });

    it('profile page exists', function() {
      return chai.request(app)
        .get('/profile')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.html;
        });
    });

    it('edit account page exists', function() {
      return chai.request(app)
        .get('/edit-account')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.html;
        });
    });

    it('review page exists', function() {
      return chai.request(app)
        .get('/review')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.html;
        });
    });
  });
});

