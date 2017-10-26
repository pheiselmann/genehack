// Tests for user login authentication

// Set global database url to local mongodb database
global.DATABASE_URL = 'mongodb://localhost/test-genehackDb';

// Import middleware for http request and Jwt testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

// Import express app and server functions
const {app, runServer, closeServer} = require('../server');
// Import mongoose user model
const {User} = require('../users');
// Import Jwt secret 
const {JWT_SECRET} = require('../config');

// Create expect variable for appending messages
// to failed assertions
const expect = chai.expect;

//  This let's us make http requests
//  in our tests.
chai.use(chaiHttp);

// Describe behavior expected from calls to auth
// endpoints
describe('Auth endpoints', function() {
  // Mock user account info
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';
  const name = firstName + " " + lastName;

  // Run server before each describe block below
  before(function() {
    return runServer();
  });

  // Close server after each describe block below
  after(function() {
    return closeServer();
  });

  // Create hashed password and mock user account from
  // database before each describe block below
  beforeEach(function() {
    return User.hashPassword(password).then(password =>
      User.create({
        username,
        password,
        name: {firstName,
        lastName}
      })
    );
  });

  // Delete mock user account from database after each
  // describe block below
  afterEach(function() {
    return User.remove({});
  });

  // Describe expected behavior of login with no credentials,
  // incorrect username, incorrect password, as well return of 
  // valid auth token if successful login occurs
  describe('/api/auth/login', function() {
    it('Should reject requests with no credentials', function() {
      return chai.request(app)
        .post('/api/auth/login')
        .then(() => expect.fail(null, null, 'Request should not succeed'))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(400);
        });
    });
    it('Should reject requests with incorrect usernames', function() {
      return chai.request(app)
        .post('/api/auth/login')
        .send({username: 'wrongUsername', password: password})
        .then(() => expect.fail(null, null, 'Request should not succeed'))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with incorrect passwords', function() {
      return chai.request(app)
        .post('/api/auth/login')
        .send({username: username, password: 'wrongPassword'})
        .then(() => expect.fail(null, null, 'Request should not succeed'))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should return a valid auth token', function() {
      return chai.request(app)
        .post('/api/auth/login')
        .send({username: username, password: password})
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          const token = res.body.authToken;
          expect(token).to.be.a('string');
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm:  ["HS256"]
          });
          expect(payload.user).to.deep.equal({
            username,
            name
          });
        })
    });
  });
});
