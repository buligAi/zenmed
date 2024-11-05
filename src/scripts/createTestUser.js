import { config } from 'dotenv';
import { connectDB } from '../config/database.js';
import { User } from '../models/user.model.js';

config();

const createTestUser = async () => {
  try {
    await connectDB();
    
    const testUser = new User({
      name: 'Dr. John Doe',
      email: 'doctor@zenmed.com',
      password: 'password123',
      role: 'doctor'
    });

    await testUser.save();
    console.log('Test user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();