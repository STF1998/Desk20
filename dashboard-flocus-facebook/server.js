const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const db = require('./db');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User');
const dotenv = require('dotenv').config();
const facebookStrategy = require('passport-facebook').Strategy;

// Get our API routes
const api = require('./server/routes/api');
const record = require('./server/routes/record');

const app = express();

// Parsers for POST data
app.use(session({ secret: 'desktwentyforthewin' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist (folder where build files are located)
app.use(express.static(path.join(__dirname, 'dist/dashboard')));

// Set our api routes
app.use('/api', api);
app.use('/api/record', record);


passport.use(new facebookStrategy({
  clientID: "498052027866336",
  clientSecret: "5efc9fa04492574b0d5632d917432018",
  callbackURL: "http://localhost:3000/facebook/callback",
  profileFields: ['id', 'friends', 'displayName', 'name', 'picture.type(large)']

},
  function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'uid': profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          console.log("user found");
          user.friends = [];
          for (let i = 0; i < profile._json.friends.data.length; i++) {
            if (profile._json.friends.data[i]) {
              user.friends.push(profile._json.friends.data[i].name);
            }
          }
          user.save(function (err) {
            if (err)
              throw err;
          });
          loginToken = token;
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.uid = profile.id;
          if (profile.name.middleName) {
            newUser.name = profile.name.givenName + ' ' + profile.name.middleName + ' ' + profile.name.familyName;
          }
          else {
            newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
          }

          newUser.pic = profile.photos[0].value;

          for (let i = 0; i < profile._json.friends.data.length; i++) {
            if (profile._json.friends.data[i]) {
              newUser.friends.push(profile._json.friends.data[i].name);
            }
          }

          newUser.save(function (err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    })
  }));


app.get('/success', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/dashboard/index.html'));
});

app.get('/failed', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/dashboard/index.html'));
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
  // if they aren't redirect them to the home page
}

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['user_friends'], return_scopes: true
}));

app.get('/facebook/callback',
  passport.authenticate('facebook', {

    successRedirect: '/success',
    failureRedirect: '/failed'
  }));



app.get('/friendsUID', isLoggedIn, async function (req, res) {
  var uids = new Array();
  var theUser = req.user;

  for (let i = 0; i < theUser.friends.length; i++) {
    await User.findOne({ 'name': theUser.friends[i] }, 'uid', function (err, user) {
      if (err) return handleError(err);
      uids.push(user.uid)
    });
  }
  res.send(uids);
});

app.get('/uid', isLoggedIn, function (req, res) {
  try {
    var theUser = req.user
    res.send(theUser.uid)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/name', isLoggedIn, function (req, res) {
  var theUser = req.user
  res.send(theUser.name)
});

app.get('/profilePic', isLoggedIn, function (req, res) {
  var theUser = req.user
  res.send(theUser.pic)
});


app.get('/friends', isLoggedIn, function (req, res) {
  var theUser = req.user
  res.send(theUser.friends);
});

app.get('/logout', isLoggedIn, function (req, res) {
  req.logout();
  console.log(req.isAuthenticated());
  res.redirect('/');
})


const port = process.env.PORT || '3000';
app.set('port', port);


const server = http.createServer(app);


server.listen(port, () => console.log(`API running on localhost:${port}`));
