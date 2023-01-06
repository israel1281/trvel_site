import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        // await mongoose.connect(process.env.LOCAL_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
})();

mongoose.connection.on('disconnected', () => {
    console.log('DB Disconnected from MongoDB');
});
mongoose.connection.on('connected', () => {
    console.log('DB connected from MongoDB');
});

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err, req, res) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8080, async () => {
    console.log('Connected to Backend on Port 8080');
});
