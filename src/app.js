// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const { dev } = require('./utils/helpers');
const { OK, INTERNAL_SERVER_ERROR } = require('./utils/http-status');
const { connectDB, deleteAllCollections } = require('./config/db');

// Load environment variables
dotenv.config();

// Delete all collections
// deleteAllCollections();

// Connect to mongodb
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(
  morgan('tiny', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes


// Basic route
app.get('/', (req, res) => {
  res.status(OK).json({ message: 'This is the Final Project API - Welcome!' });
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err.message);
  res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something went wrong!',
    error: dev ? err.message : undefined,
  });
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server is running on port ${process.env.PORT || 3000}`);
});
