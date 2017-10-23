global.DATABASE_URL = 'mongodb://localhost/test-genehackDb';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../users');
const {JWT_SECRET} = require('../config');

const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
chai.use(chaiHttp);

describe('Auth endpoints', function() {
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';
  const name = firstName + " " + lastName;

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

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

  afterEach(function() {
    return User.remove({});
  });

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
