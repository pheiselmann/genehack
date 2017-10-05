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
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);


describe('Protected endpoint', function() {
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';
  const snpVariant = 'GG';

  before(function() {
    // return runServer(TEST_DATABASE_URL);
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
        lastName},
        snpVariant
      })
    );
  });

  afterEach(function() {
    return User.remove({});
  });

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
        exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
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
          //expect(res.body.data).to.equal('rosebud');
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
        firstName:'Bob', 
        lastName: 'Roberts',
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
          res.body.name.should.equal(updateData.firstName + " " + updateData.lastName);
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
        firstName:'Bob', 
        lastName: 'Roberts',
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
