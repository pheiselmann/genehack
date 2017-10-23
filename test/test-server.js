const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server.js');

const {User} = require('../users')
const {TEST_DATABASE_URL} = require('../config');

const should = chai.should();

chai.use(chaiHttp);

describe('HTML resources', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  })

//BELOW ARE INITIAL TESTS TO MAKE SURE HTML PAGES APPEAR
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

