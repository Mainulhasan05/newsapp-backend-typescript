import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const db = process.env.DB_URL;
if (!db) {
    throw new Error('DB_URL is not defined in environment variables');
}

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;

