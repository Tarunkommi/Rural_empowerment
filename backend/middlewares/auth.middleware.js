const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const env = require('../config/env');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized to access this route. Token missing.');
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, env.jwt.secret);

      // Find user and attach to request
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new ApiError(401, 'The user belonging to this token no longer exists.');
      }

      req.user = user;
      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new ApiError(401, 'Token expired. Please login again or use refresh token.');
      }
      if (err.name === 'JsonWebTokenError') {
        throw new ApiError(401, 'Invalid token. Please login again.');
      }
      throw new ApiError(401, 'Not authorized to access this route.');
    }
  } catch (error) {
    next(error);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, `User role ${req.user.role} is not authorized to access this route`)
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
