import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

dotenv.config(); // Load environment variables from .env file
const app = express(); // Initialize the Express application
const port = process.env.PORT || 5002;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use('/api/auth', authRoutes); // Mounting auth routes
app.use('/api/messages', messageRoutes); // Mounting message routes

app.listen(port, () => {
    connectToDB();
    console.log(`Server is running on http://localhost:${port}`);
})