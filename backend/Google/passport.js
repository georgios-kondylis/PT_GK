// backend > Google > passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://pt-gk.onrender.com/user/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  const user = {
    googleId: profile.id,
    name: profile.displayName,
    email: profile.emails?.[0].value,
    image: profile.photos?.[0].value
  };

  // 🔥 You can save the user to MongoDB here if needed
  return done(null, user);
}));

// OLD URL http://localhost:3000/user/auth/google
// NEW URL https://pt-gk.onrender.com/user/auth/google