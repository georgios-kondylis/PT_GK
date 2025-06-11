// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToMongoDB } from './mongoDB/connectToMongoDB.js';
import userRoutes from './mongoDB/userRoutes.js';
import './Google/passport.js';
import passport from 'passport';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// MongoDB
connectToMongoDB();

// Routes
app.use('/user', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running`);
});


//https://pt-gk.onrender.com