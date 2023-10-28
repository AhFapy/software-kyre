const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/UserSchema")

passport.use(
    new LocalStrategy(
      {
        usernameField: 'username', // Field name for the username in the request body
        passwordField: 'password', // Field name for the password in the request body
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });
  
          // If the user is not found
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          // Authentication successful, return the user object
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
})
  
router.post('/login', passport.authenticate('local', {
  successRedirect: 'https://ahfa-portfolio.netlify.app', // Redirect after successful login
  failureRedirect: '/',     // Redirect after failed login
  failureFlash: true
}));
  
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  
  router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // This route is only accessible to authenticated users
    res.render('dashboard');
  });
  
module.exports = router;
