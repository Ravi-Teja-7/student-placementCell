const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/userSchema');

// const local = new LocalStrategy({ usernameField: 'email' }, function (
//   email,
//   password,
//   done
// ) {
//   User.findOne({ email }, function (error, user) {
//     if (error) {
//       console.log(`Error in finding user: ${error}`);
//       return done(error);
//     }

//     if (!user || !user.isPasswordCorrect(password)) {
//       console.log('Invalid Username/Password');
//       return done(null, false);
//     }
//     return done(null, user);
//   });
// });

const local = new LocalStrategy({ usernameField: 'email' }, async function (
  email,
  password,
  done
) {
  try {
    const user = await User.findOne({ email }).exec();

    if (!user || !user.isPasswordCorrect(password)) {
      console.log('Invalid Username/Password');
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    console.log(`Error in finding user: ${error}`);
    return done(error);
  }
});


passport.use('local', local);

//serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id).exec();

    if (!user) {
      console.log('User not found');
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    console.log('Error in finding user --> Passport');
    return done(error);
  }
});


// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/users/signin');
};

// set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
