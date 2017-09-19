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

// CORS
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
// Set views directory
app.set('views', __dirname + '/views');


app.use(passport.initialize());

passport.use(localStrategy);
passport.use(jwtStrategy);


app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);


//redirect url from localhost:8080/api/auth/login to localhost:8080/account

const redirectsMap = {
  "/api/auth/login": "/account",
  "/test": "/account"
};

function handleRedirects(req, res, next) {
  if (Object.keys(redirectsMap).find((entry) => entry === req.path)) {
    console.log(`Redirecting ${req.path} to ${redirectsMap[req.path]}`);
    res.redirect(301, redirectsMap[req.path]);
  } else {
    next();
  }
}


app.use(handleRedirects);


app.get('/api/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
      User
        .findOne({username: req.body.username})
        .exec()
    //apiRepr can be used as a token showing someone has logged in
    .then(profile => { return res.json(profile.apiRepr())})
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
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


app.get('/account',passport.authenticate('jwt', { session: false }), (req, res) => {
  // Use the current user in order to 
  // populate the template
  console.log("Req user", req.user);
  res.json( {
    //id: this._id,
    name: req.user.name,
    username: req.user.username,
    snpVariant: req.user.snpVariant
    //report: this.report
  });
});


app.get('/review', (req, res) => {
  res.render('review.html');
});

app.post('/login', (req, res) =>  {
  console.log("POST body = ", req.body);
  var name, password;
  if(req.body.username && req.body.password){
    name = req.body.username;
    password = req.body.password;
  }
  console.log("Name = '" + name + "'") ;
  console.log("Password = '" + password + "'");


app.post('/profile', (req, res) => {
  User
    // .findOne({username: "genemachine", password: "luckyone"})
    // .findOne({username: "bobcat", password: "youruncle"})
    // .findOne({_username: req.username, _password: req.password})
    .findOne({username: req.body.username, password: req.body.password})
    .exec()
    .then(user => {
      var payload = {id: user.id};
      const authToken = createAuthToken(user.apiRepr());
      res.json({message: "ok", token: authToken});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
  });
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }
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
