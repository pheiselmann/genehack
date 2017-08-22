const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// var server = require('../server.js');

//const {app} = require('../server.js');

const {app, runServer, closeServer} = require('../server.js');
const {User} = require('../models');
const {TEST_DATABASE_URL} = require('../config');


const should = chai.should();
// var app = server.app;
//var storage = server.storage;

chai.use(chaiHttp);


function seedUserProfileData() {
  console.info('seeding user profile data');
  const seedData = [];

 // for (let i=1; i<=1; i++) {
    seedData.push(generateUserProfileData());
  //}
  // this will return a promise
  return User.insertMany(seedData);
}

// used to generate data to put in db
function generateUserFirstName() {
  const userFirstName = [
    'Bobby', 'Sue', 'Melvin', 'Jean', 'Vance'];
  return userFirstName[Math.floor(Math.random() * userFirstName.length)];
}

function generateUserLastName() {
  const userLastName = [
    'Smith', 'Jones', 'Nelson', 'Fields', 'Hill'];
  return userLastName[Math.floor(Math.random() * userLastName.length)];
}

function generateUsername() {
  const userUsername = ['buddy', 'biddy', 'boddy', 'beddy', 'baddy'];
  return userUsername[Math.floor(Math.random() * userUsername.length)];
}

function generatePassword() {
  const userPassword = ['secret', 'hidden', 'esoteric', 'arcane', 'occult'];
  return userPassword[Math.floor(Math.random() * userPassword.length)];
}

function generatesnpVariant() {
  const userVariant = ['AA', 'AG', 'GG'];
  return userVariant[Math.floor(Math.random() * userVariant.length)];
}

function generateReport() {
  const userReport = ['good', 'bad', 'ugly'];
  return userReport[Math.floor(Math.random() * userReport.length)];
}

// generate an object represnting a blog post.
// can be used to generate seed data for db
// or request.body data
function generateUserProfileData() {
  return {
    name: {
      firstName: generateUserFirstName(),
      lastName: generateUserLastName()
    },
    username: generateUsername(),
    password: generatePassword(),
    snpVariant: generatesnpVariant(),
    report: generateReport()
    //created: faker.date.past()
  }
}


// this function deletes the entire database.
// we'll call it in an `afterEach` block below
// to ensure  ata from one test does not stick
// around for next one
function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Users API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedUserProfileData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedUserProfileData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  })

  // note the use of nested `describe` blocks.
  // this allows us to make clearer, more discrete tests that focus
  // on proving something small
  describe('GET endpoint', function() {


    it('should return a user profile with right fields', function() {
      // Strategy: Get back all blog posts, and ensure they have expected keys

      let resUser;
      return chai.request(app)
        .get('/profile')
        //locate first profile
        //.findOne({_username: req.username, _password: req.password})
        //.findOne()
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          // res.body.should.be.a('array');
          // res.body.should.have.length.of.at.least(1);
          res.body.should.include.keys(
            'id', 'name', 'username', 'password', 'snpVariant', 'report');
          // res.body.forEach(function(post) {
          //   post.should.be.a('object');
          //   post.should.include.keys(
          //     'id', 'author', 'title', 'content', 'created');
          // });
          // resUser = res.body[0];
          resUser = res.body;
          return User.findById(resUser.id);
        })
        .then(function(profile) {

          resUser.id.should.equal(profile.id);
          resUser.name.should.contain(profile.name.firstName);
          resUser.username.should.equal(profile.username);
          resUser.password.should.equal(profile.password);
          resUser.snpVariant.should.equal(profile.snpVariant);
          resUser.report.should.equal(profile.report);

          //resUser.created.should.equal(post.created);
        });
    });
  });

//BELOW ARE INITIAL TESTS TO MAKE SURE HTML PAGES APPEAR
  describe('html pages', function() {

  it('info upload page exists', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.html;
    });
  });

  it('account page exists', function() {
    return chai.request(app)
      .get('/account')
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



//BELOW ARE INITIAL TESTS TO MAKE SURE HTML PAGES APPEAR
// describe('html pages', function() {

// //**

// // Before our tests run, we activate the server. Our `runServer`
//   // function returns a promise, and we return the that promise by
//   // doing `return runServer`. If we didn't return a promise here,
//   // there's a possibility of a race condition where our tests start
//   // running before our server has started.
//   before(function() {
//     return runServer(TEST_DATABASE_URL);
//   });

//   // although we only have one test module at the moment, we'll
//   // close our server at the end of these tests. Otherwise,
//   // if we add another test module that also has a `before` block
//   // that starts our server, it will cause an error because the
//   // server would still be running from the previous tests.
//   after(function() {
//     return closeServer();
//   });
// //**


//   it('info upload page exists', function() {
//     return chai.request(app)
//       .get('/')
//       .then(function(res) {
//         res.should.have.status(200);
//         res.should.be.html;
//     });
//   });


//   it('account page exists', function() {
//     return chai.request(app)
//       .get('/account')
//       .then(function(res) {
//         res.should.have.status(200);
//         res.should.be.html;
//     });
//   });

//   it('review page exists', function() {
//     return chai.request(app)
//       .get('/review')
//       .then(function(res) {
//         res.should.have.status(200);
//         res.should.be.html;
//     });
//   });
// });
