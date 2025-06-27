import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      logger.error('MONGODB_URI is not defined');
      process.exit(1);
    }
    await mongoose.connect(mongoURI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const deleteAllCollections = async () => {
  const collections = mongoose.connection.collections;
  if (!collections) {
    logger.error('No collections found');
    return;
  }
  for (const collection of Object.values(collections)) {
    try {
      await collection.drop();
    } catch (err) {
      if (err.message !== 'ns not found') {
        logger.error(`Error dropping collection ${collection.name}:`, err);
      }
    }
  }
  logger.info('All collections dropped');
};
