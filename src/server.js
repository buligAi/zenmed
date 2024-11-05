import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import prescriptionRoutes from './routes/prescription.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import logger from './config/logger.js';
import { spawn } from 'child_process';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;

// Basic middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling
app.use(errorHandler);

// Start Vite development server
const startVite = () => {
  const vite = spawn('npx', ['vite'], {
    stdio: 'inherit',
    shell: true
  });

  vite.on('error', (err) => {
    logger.error('Failed to start Vite server:', err);
  });
};

// MongoDB connection and server startup
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('MongoDB Connected');
    
    // Start the Express server
    app.listen(port, '0.0.0.0', () => {
      logger.info(`API Server running on port ${port}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
      
      // Start Vite development server
      startVite();
    });
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});