const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const Candidate = require('../models/Candidate');

module.exports = function(passport) {
  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/linkedin/callback",
    scope: ['r_liteprofile', 'r_emailaddress'],
    state: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { id, displayName, emails, photos } = profile;
      let candidate = await Candidate.findOne({ linkedinId: id });
      if (candidate) {
        return done(null, candidate);
      } else {
        candidate = new Candidate({
          linkedinId: id,
          name: displayName,
          email: emails && emails.length > 0 ? emails[0].value : '',
          profilePic: photos && photos.length > 0 ? photos[0].value : '',
        });
        await candidate.save();
        return done(null, candidate);
      }
    } catch (err) {
      console.error(err);
      return done(err, null);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const candidate = await Candidate.findById(id);
      done(null, candidate);
    } catch (err) {
      done(err, null);
    }
  });
};
