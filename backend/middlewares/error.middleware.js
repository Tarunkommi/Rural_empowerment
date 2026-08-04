const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const env = require('../config/env');
const logger = require('../utils/logger');

const sendErrorDev = (err, req, res) => {
  logger.error(`${err.message}\n${err.stack}`);
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
    error: err
  });
};

const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors
    });
  } 
  
  // Programming or other unknown error: don't leak error details
  logger.error(`CRITICAL ERROR 💥:`, err);
  return res.status(500).json({
    success: false,
    message: 'Something went very wrong!',
    errors: []
  });
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.name = err.name;
  error.statusCode = err.statusCode || 500;
  error.errors = err.errors || [];
  error.stack = err.stack;
  
  // Convert non-ApiError instances to ApiError structure
  if (!(err instanceof ApiError)) {
    // Mongoose bad ObjectId
    if (error.name === 'CastError') {
      error = new ApiError(404, `Resource not found with id of ${error.value}`);
    }

    // Mongoose duplicate key
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      error = new ApiError(400, `Duplicate field value entered for ${duplicateField}. Please use another value.`);
    }

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map((val) => val.message).join(', ');
      const errors = Object.values(error.errors).map(val => ({ [val.path]: val.message }));
      error = new ApiError(400, message, errors);
    }
    
    // JWT Errors
    if (error.name === 'JsonWebTokenError') {
      error = new ApiError(401, 'Invalid token. Please log in again.');
    }
    if (error.name === 'TokenExpiredError') {
      error = new ApiError(401, 'Your token has expired. Please log in again.');
    }

    // Multer Errors
    if (error.name === 'MulterError') {
      if (error.code === 'LIMIT_FILE_SIZE') {
        error = new ApiError(400, 'File is too large.');
      } else {
        error = new ApiError(400, error.message);
      }
    }
    
    // Fallback for completely unknown errors
    if (!error.isOperational && !(err instanceof ApiError)) {
      error.isOperational = false;
    }
  } else {
      error.isOperational = true;
  }

  if (env.nodeEnv === 'development') {
    sendErrorDev(error, req, res);
  } else {
    sendErrorProd(error, req, res);
  }
};

module.exports = errorHandler;
