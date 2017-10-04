require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('./config');

const {router: usersRouter, User} = require('./users');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');

const {DATABASE_URL, PORT} = require('./config');

const app = express();

const createAuthToken = user => {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }) );
mongoose.Promise = global.Promise;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

// Adding mustache as a view engine
var expmustache = require('mustache-express');
app.engine('mustache', expmustache());
app.set('view engine','mustache');

app.set('views', __dirname + '/views');

app.use(passport.initialize());

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

app.get('/api/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      console.log("username: " + req.user.username);
      User
        .findOne({username: req.user.username})
        .exec()
    .then(profile => { return res.json(profile.apiRepr())})
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    })
  }
);

app.delete('/api/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      console.log("username: " + req.user.username);
      User
        .findOneAndRemove({username: req.user.username})
        .exec()
    .then(() => res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    })
  }
);

//create put request
app.put('/api/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      console.log("username: " + req.user.username);
      console.log("snpVariant: " + req.body['snpVariant']);

      const incorrectVariant =
        ('snpVariant' in req.body) && 
        !(req.body['snpVariant'] === '' || 
        req.body['snpVariant'] === 'TT' || 
        req.body['snpVariant'] === 'GT' || 
        req.body['snpVariant'] === 'GG');


      if (incorrectVariant) {
        return res.status(422).json({
          code: 422,
          reason: 'ValidationError',
          message: 'Incorrect snpVariant',
          location: incorrectVariant
        });
      }

      const toUpdate = {};
      toUpdate.name = {};
      toUpdate.name.firstName = req.body.firstName;
      toUpdate.name.lastName = req.body.lastName;
      toUpdate.snpVariant = req.body.snpVariant;

      User
        .findOneAndUpdate({username: req.user.username}, {$set: toUpdate}, {new: true})
        .exec()
        .then(user => {
          return res.status(201).json(user.apiRepr());
        })
        .catch(err => {
          if (err.reason === 'ValidationError') {
            return res.status(err.code).json(err);
          }
          res.status(500).json({code: 500, message: 'Internal server error'});
        })
    }
);

app.use(express.static('public/js'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/review', (req, res) => {
  res.render('review');
});

app.get('/create-account', (req, res) => {
  res.render('create-account');
});

app.get('/edit-account', (req, res) => {
  res.render('edit-account');
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};

//
