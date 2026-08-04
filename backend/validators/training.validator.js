const { body } = require('express-validator');
const { validate } = require('./auth.validator');

const trainingValidation = [
  body('courseName')
    .trim()
    .notEmpty().withMessage('Course name is required')
    .isLength({ max: 150 }).withMessage('Course name cannot exceed 150 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('trainer')
    .trim()
    .notEmpty().withMessage('Trainer name is required'),
  body('duration')
    .trim()
    .notEmpty().withMessage('Duration is required'),
  body('level')
    .trim()
    .notEmpty().withMessage('Level is required')
    .isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid level'),
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required'),
  body('seats')
    .notEmpty().withMessage('Total seats are required')
    .isInt({ min: 1 }).withMessage('Seats must be at least 1'),
  body('certificate')
    .optional()
    .isBoolean().withMessage('Certificate must be a boolean value'),
  body('status')
    .optional()
    .isIn(['Open', 'Ongoing', 'Completed']).withMessage('Invalid status')
];

module.exports = {
  validate,
  trainingValidation
};
