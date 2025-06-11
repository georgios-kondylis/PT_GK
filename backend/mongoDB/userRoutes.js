// userRoutes.js
import express from 'express';
import User from './userSchemma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

// ----------------- GOOGLE ROUTES ----------------- //

// Start Google login flow
// http://localhost:3000/user/auth/google
// https://pt-gk.onrender.com/user/auth/google
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Callback route after Google login
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const googleUser = req.user;

      // Check if user already exists by email
      let user = await User.findOne({ email: googleUser.email });

      // If not, create a new one
      if (!user) {
        user = new User({
          firstName: googleUser.name.split(' ')[0],
          lastName: googleUser.name.split(' ').slice(1).join(' ') || '',
          email: googleUser.email,
          image: googleUser.image
          // ⚠️ No password since it's a Google login
        });

        await user.save();
      }

      // Sign token using MongoDB _id
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Redirect to frontend with token and user data
      const redirectURL = new URL(`https://pt-gk.vercel.app//google-succes`);
      redirectURL.searchParams.append('token', token);
      redirectURL.searchParams.append('_id', user._id.toString());
      redirectURL.searchParams.append('firstName', user.firstName);
      redirectURL.searchParams.append('lastName', user.lastName);
      redirectURL.searchParams.append('email', user.email);
      redirectURL.searchParams.append('image', user.image || '');

      res.redirect(redirectURL.toString());


    } catch (error) {
      console.error('Google auth error:', error);
      res.status(500).json({ message: 'Google authentication failed' });
    }
  }
);

// ----------------- GOOGLE ROUTES END ----------------- //

// --------------- SIGN-UP --------------- //
router.post('/sign-up', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --------------- LOG-IN --------------- //
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("firstName lastName email password image");

    if (!user) { return res.status(400).json({ message: 'Invalid credentials' }); }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// --------------- LOG-IN | SIGN-UP END --------------- //

// GET: Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;