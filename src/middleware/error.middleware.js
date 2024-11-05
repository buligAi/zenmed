import logger from '../config/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate key error',
      field: Object.keys(err.keyPattern)[0]
    });
  }

  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};