const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');

// Enable strictQuery to prevent querying fields not in the schema (Mongoose 7+ best practice)
mongoose.set('strictQuery', true);

const dbOptions = {
  // Connection Pooling Settings
  maxPoolSize: 50, // Maintain up to 50 socket connections
  minPoolSize: 10, // Maintain at least 10 active connections in the pool
  
  // Timeout Settings
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

const connectDB = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      const connectionInstance = await mongoose.connect(env.mongoUri, dbOptions);
      logger.info(`\nMongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
      
      // Handle dropped connections dynamically
      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected! Mongoose will automatically try to reconnect...');
      });
      
      mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected successfully.');
      });
      
      mongoose.connection.on('error', (err) => {
        logger.error('MongoDB connection error:', err);
      });

      return connectionInstance;
    } catch (error) {
      retries -= 1;
      logger.error(`MongoDB connection FAILED: ${error.message}. Retries left: ${retries}`);
      
      if (retries === 0) {
        logger.error('Exhausted all retries for MongoDB connection. Exiting process.');
        process.exit(1);
      }
      
      logger.info(`Retrying MongoDB connection in ${delay / 1000} seconds...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

module.exports = connectDB;
