
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const {DATABASE_URL, PORT} = require('./config');
const {User} = require('./models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.use(express.static('public'));

mongoose.Promise = global.Promise;
//app.listen(process.env.PORT || 8080);
//exports.app = app;

//NOT SURE WHAT TO DO FROM HERE DOWN WITH MONGOOSE AND MODELS - AND HOW 
//TO INTEGRATE THIS WITH THE JQUERY AJAX CALL IN MY JAVASCRIPT FILES!!!

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/account', (req, res) => {
  res.sendFile(__dirname + '/public/account.html');
});


app.get('/review', (req, res) => {
  res.sendFile(__dirname + '/public/review.html');
});

//**

// app.get('/profiles', (req, res) => {
//   User
//     .find()
//     .exec()
//     .then(profiles => {
//       res.json(profiles.map(profile => profile.apiRepr()));
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({error: 'something went terribly wrong'});
//     });
// });

//****IN PROGRESS

app.get('/profiles', (req, res) => {
    const filters = {};
    const queryableFields = ['username', 'password'];
    queryableFields.forEach(field => {
        if (req.query[field]) {
            filters[field] = req.query[field];
        }
    });
    User
        .find(filters)
        .exec()
        .then(Users => res.json(
            Users.map(user => user.apiRepr())
        ))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'})
        });
});

//****SEE ABOVE

app.get('/profile', (req, res) => {
  User
    // .findOne({username: "genemachine", password: "luckyone"})
    // .findOne({username: "bobcat", password: "youruncle"})
    .findOne({_username: req.username, _password: req.password})
    .exec()
    .then(profile => {res.json(profile.apiRepr())})
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
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
