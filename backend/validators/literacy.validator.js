const { body } = require('express-validator');
const { validate } = require('./auth.validator');

const literacyValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 150 }).withMessage('Title cannot exceed 150 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('content')
    .notEmpty().withMessage('Content is required'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn([
      'Smartphone Basics',
      'Internet',
      'Email',
      'Digital Payments',
      'DigiLocker',
      'Aadhaar',
      'Cyber Security',
    ])
    .withMessage('Invalid category'),
  body('videoUrl')
    .optional({ checkFalsy: true })
    .isURL().withMessage('Must be a valid URL'),
  body('readingTime')
    .optional({ checkFalsy: true })
    .isNumeric().withMessage('Reading time must be a number')
    .isInt({ min: 1 }).withMessage('Reading time must be at least 1 minute')
];

module.exports = {
  validate,
  literacyValidation
};
