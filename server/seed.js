import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ email: 'admin@techhub.com' });

    if (adminExists) {
      console.log('Admin user exists, updating password...');
      adminExists.password = 'adminpassword123';
      await adminExists.save();
      console.log('Admin password updated successfully');
      process.exit();
    }

    const admin = await User.create({
      name: 'Tech Hub Admin',
      email: 'admin@techhub.com',
      password: 'adminpassword123', // User should change this
      role: 'admin'
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@techhub.com');
    console.log('Password: adminpassword123');
    process.exit();
  } catch (err) {
    console.error('Error seeding admin:', err.message);
    process.exit(1);
  }
};

seedAdmin();
