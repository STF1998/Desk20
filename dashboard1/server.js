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

const app = express();

// Parsers for POST data
app.use(session({ secret: 'desktwentyforthewin' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist (folder where build files are located)
app.use(express.static(path.join(__dirname, 'dist/dashboard1')));

// Set our api routes
app.use('/api', api);

passport.use(new facebookStrategy({
  clientID: "498052027866336",
  clientSecret: "5efc9fa04492574b0d5632d917432018",
  callbackURL: "http://localhost:3000/facebook/callback",
  profileFields: ['id', 'friends', 'displayName', 'name', 'picture.type(large)']

},
  function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'uid': profile.id }, function (err, user) {
        if (err)
          return done(err);
        if (user) {
          console.log("user found");
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.uid = profile.id;
          newUser.name = profile.name.givenName + ' ' + profile.name.familyName;

          newUser.pic = profile.photos[0].value;
          //newUser.friends = profile._json.friends.data[0].name
          newUser.save(function (err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    })
  }));

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/app/bar-chart/bar-chart.component.html'));
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
    failureRedirect: (path.join(__dirname, 'src/app/app.component.html'))
  }));


app.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile', {
    user: req.user // get the user out of session and pass to template
  });
});
const port = process.env.PORT || '3000';
app.set('port', port);


const server = http.createServer(app);


server.listen(port, () => console.log(`API running on localhost:${port}`));
