// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToMongoDB } from './mongoDB/connectToMongoDB.js';
import userRoutes from './mongoDB/userRoutes.js';
dotenv.config();

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
// app.use('/api/chat', chatRoutes);
app.use('/user', userRoutes);

connectToMongoDB()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
