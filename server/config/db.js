import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedData } from '../utils/seeder.js';

let mongod = null;

const connectDB = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      let dbUrl = process.env.MONGODB_URI;

      // Use memory server ONLY if no MONGODB_URI is provided at all
      if (process.env.NODE_ENV === 'development' && !dbUrl) {
        console.log('Starting Zero-Install Local MongoDB (Memory Server)...');
        mongod = await MongoMemoryServer.create();
        dbUrl = mongod.getUri();
        console.log('Memory MongoDB started at:', dbUrl);
      }

      if (!dbUrl) {
        throw new Error('No MongoDB URI provided');
      }

      console.log(`Connecting to MongoDB (attempt ${i + 1}/${retries})...`);
      const conn = await mongoose.connect(dbUrl, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      mongoose.connection.on('error', err => {
        console.error(`MongoDB runtime error: ${err}`);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected! Attempting to reconnect...');
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`);
      
      // Seed initial data if using memory server for the first time
      if (mongod) {
        await seedData();
      }
      
      return conn;
    } catch (err) {
      console.error(`DATABASE CONNECTION ERROR (attempt ${i + 1}/${retries}): ${err.message}`);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('All database connection attempts failed. Continuing server start, mongoose will auto-retry...');
      }
    }
  }
};

export default connectDB;
