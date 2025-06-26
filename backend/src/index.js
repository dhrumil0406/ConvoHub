import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app, server } from './lib/socket.js';

dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 5002;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(cookieParser()); // Middleware to parse cookies

app.use('/api/auth', authRoutes); // Mounting auth routes
app.use('/api/messages', messageRoutes); // Mounting message routes

server.listen(port, () => {
    connectToDB();
    console.log(`Server is running on http://localhost:${port}`);
})