const express = require('express');
const passport = require('passport');
const router = express.Router();

// Initiate LinkedIn authentication
router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));

// LinkedIn callback URL
router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    // On success, redirect to profile page (adjust as needed)
    res.redirect('http://localhost:3000/profile');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000');
});

module.exports = router;
