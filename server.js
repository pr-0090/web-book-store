// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import { connectCloudinary } from './config/cloudinary.js';
import productRouter from './routes/productRoute.js'; // 👈 adjust path if needed



dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
connectDB();
connectCloudinary()

//API endpoints
app.use('/api/users', userRouter);
app.use('/api/product',productRouter);

// Routes

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Start Server
app.listen(4000, () => console.log("Server running on port 4000"));


