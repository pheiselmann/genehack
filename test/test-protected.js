// Tests for Ajax calls to protected endpoints

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

//  This let's us make HTTP requests
//  in our tests.
chai.use(chaiHttp);

// Describe behavior expected from calls to protected
// endpoints
describe('Protected endpoint', function() {
  // Mock user account info
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';
  const snpVariant = 'GG';

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
        lastName},
        snpVariant
      })
    );
  });

  // Delete mock user account from database after each
  // describe block below
  afterEach(function() {
    return User.remove({});
  });

  // Describe the expected behavior of Ajax calls to protected endpoints
  // with no credentials, an invalid or expired token, and GET, PUT and 
  // DELETE requests
  describe('/api/protected', function() {
    it('Should reject requests with no credentials', function() {
      return chai.request(app)
        .get('/api/protected')
        .then(() => expect.fail(null, null, 'Request should not succeed'))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });

    it('Should reject requests with an invalid token', function() {
      const token = jwt.sign({
        username,
        name: {firstName,
        lastName},
        snpVariant
      }, 'wrongSecret', {
        algorithm: 'HS256',
        expiresIn: '7d'
      });

      return chai.request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${token}`)
        .then(() => expect.fail(null, null, 'Request should not succeed'))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });

    it('Should reject requests with an expired token', function() {
      const token = jwt.sign({
        user: {
          username,
          name: {firstName,
          lastName},
          snpVariant
        },
        exp: Math.floor(Date.now() / 1000) - 10 //  Expired ten seconds ago
      }, JWT_SECRET, {
        algorithm: 'HS256',
        subject: username
      });

      return chai.request(app)
        .get('/api/protected')
        .set('authorization', `Bearer ${token}`)
        .then(() => expect.fail(null, null, 'Request should not succeed'))
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });

    it('Should send protected data upon GET request', function() {
      const token = jwt.sign({
        user: {
          username,
          name: {firstName,
          lastName},
          snpVariant
        },
      }, JWT_SECRET, {
        algorithm: 'HS256',
        subject: username,
        expiresIn: '7d'
      });

      return chai.request(app)
        .get('/api/protected')
        .set('authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
        });
    });

    it('Should update items on PUT', function() {
      const token = jwt.sign({
        user: {
          username,
          name: {firstName,
          lastName},
          snpVariant
        },
      }, JWT_SECRET, {
        algorithm: 'HS256',
        subject: username,
        expiresIn: '7d'
      });

      const updateData = {
        snpVariant: 'TT'
      }

      return chai.request(app)
        .put('/api/protected')
        .set('authorization', `Bearer ${token}`)
        .send(updateData)
        .then(function(res) {
          console.log("res body: " + JSON.stringify(res.body));
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.snpVariant.should.equal(updateData.snpVariant)
        });
    });

    it('Should reject a PUT request with wrong snpVariant', function() {
      const token = jwt.sign({
        user: {
          username,
          name: {firstName,
          lastName},
          snpVariant
        },
      }, JWT_SECRET, {
        algorithm: 'HS256',
        subject: username,
        expiresIn: '7d'
      });

      const updateData = {
        snpVariant: 'BB'
      }

      return chai.request(app)
        .put('/api/protected')
        .set('authorization', `Bearer ${token}`)
        .send(updateData)
        .then(function(res) {
          res.should.have.status(201).should.throw(Error);
        })
        .catch(function(e) {
          console.log(e.response.text);
          e.response.text.should.equal('{"code":422,"reason":"ValidationError","message":"Incorrect snpVariant","location":true}');
        });
    });

    it('Should delete items on DELETE', function() {
      const token = jwt.sign({
        user: {
          username,
          name: {firstName,
          lastName},
          snpVariant
        },
      }, JWT_SECRET, {
        algorithm: 'HS256',
        subject: username,
        expiresIn: '7d'
      });
      return chai.request(app)
      .delete('/api/protected')
      .set('authorization', `Bearer ${token}`)
      .then(function(res) {
        res.should.have.status(204);
      });
    });
  });
});
