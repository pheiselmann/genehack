const chai = require('chai');
const chaiHttp = require('chai-http');
// var server = require('../server.js');

//const {app} = require('../server.js');

const {app, runServer, closeServer} = require('../server.js');


const should = chai.should();
// var app = server.app;
//var storage = server.storage;

chai.use(chaiHttp);


describe('html pages', function() {

//**

// Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the that promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(function() {
    return runServer();
  });

  // although we only have one test module at the moment, we'll
  // close our server at the end of these tests. Otherwise,
  // if we add another test module that also has a `before` block
  // that starts our server, it will cause an error because the
  // server would still be running from the previous tests.
  after(function() {
    return closeServer();
  });
//**


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
