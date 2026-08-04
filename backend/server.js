const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/database');
const logger = require('./utils/logger');

// Uncaught Exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message, err.stack);
  process.exit(1);
});

let server;

// Connect to Database, then start Server
connectDB()
  .then(() => {
    server = app.listen(env.port, () => {
      logger.info(`Server is running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  })
  .catch((err) => {
    logger.error('Database connection failed', err);
  });

// Unhandled Rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message, err.stack);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
