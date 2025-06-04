import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {

    const MONGO_URI = process.env.DATABASE_URL || "";
    
    try {
        await mongoose.connect(MONGO_URI);

    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;
