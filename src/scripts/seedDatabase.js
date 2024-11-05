import { config } from 'dotenv';
import { connectDB } from '../config/database.js';
import { User } from '../models/user.model.js';
import { Prescription } from '../models/prescription.model.js';
import logger from '../config/logger.js';

config();

const sampleUsers = [
  {
    name: 'Dr. John Doe',
    email: 'doctor@zenmed.com',
    password: 'password123',
    role: 'doctor'
  },
  {
    name: 'Jane Smith',
    email: 'patient@zenmed.com',
    password: 'password123',
    role: 'patient'
  },
  {
    name: 'HealthCare Pharmacy',
    email: 'pharmacy@zenmed.com',
    password: 'password123',
    role: 'pharmacy'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Prescription.deleteMany({});
    
    // Create users
    const createdUsers = await User.create(sampleUsers);
    
    const doctor = createdUsers.find(user => user.role === 'doctor');
    const patient = createdUsers.find(user => user.role === 'patient');
    
    // Create sample prescriptions
    const samplePrescriptions = [
      {
        patientId: patient._id,
        doctorId: doctor._id,
        medication: 'Amoxicillin',
        dosage: '500mg',
        frequency: '3x daily',
        duration: '7 days',
        status: 'active',
        notes: 'Take with food'
      },
      {
        patientId: patient._id,
        doctorId: doctor._id,
        medication: 'Metformin',
        dosage: '850mg',
        frequency: '2x daily',
        duration: '30 days',
        status: 'active',
        notes: 'Take with meals'
      }
    ];

    await Prescription.create(samplePrescriptions);

    logger.info('Database seeded successfully!');
    logger.info('Sample user credentials:');
    logger.info('Doctor - Email: doctor@zenmed.com, Password: password123');
    logger.info('Patient - Email: patient@zenmed.com, Password: password123');
    logger.info('Pharmacy - Email: pharmacy@zenmed.com, Password: password123');

    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();