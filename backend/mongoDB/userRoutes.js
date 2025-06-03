// userRoutes.js
import express from 'express';
import User from './userSchemma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();


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

// DELETE: Delete a user by ID and their review
// router.delete('/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // First, delete the review(s) linked to this user
//     await Review.deleteMany({ userId });

//     // Then delete the user
//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'User and associated review(s) deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user and review:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // PUT: Update user info
// router.put('/update', upload.single('image'), async (req, res) => {
//   try {
//     const { userId, firstName, lastName, email, password, prevPassword } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isPasswordCorrect = await bcrypt.compare(prevPassword, user.password);
//     if (!isPasswordCorrect) return res.status(400).json({ message: 'Old password is incorrect' });

//     let hashedPassword = user.password;
//     if (password) hashedPassword = await bcrypt.hash(password, 10);

//     let imageUrl = user.image;
//     if (req.file) {
//       const streamUpload = () => {
//         return new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             { folder: 'user_profiles' },
//             (error, result) => {
//               if (result) resolve(result);
//               else reject(error);
//             }
//           );
//           streamifier.createReadStream(req.file.buffer).pipe(stream);
//         });
//       };

//       const result = await streamUpload();
//       imageUrl = result.secure_url;
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { firstName, lastName, email, password: hashedPassword, image: imageUrl },
//       { new: true }
//     );

//     return res.status(200).json({ user: updatedUser });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

export default router;
// add