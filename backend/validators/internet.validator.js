const { body } = require('express-validator');
const { validate } = require('./auth.validator');

const internetValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 150 }).withMessage('Title cannot exceed 150 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn([
      'BharatNet',
      'PM-WANI',
      'Public Wi-Fi',
      'Mobile Connectivity',
      'Rural Internet Centers',
      'Other'
    ])
    .withMessage('Invalid category'),
  body('coverageArea')
    .trim()
    .notEmpty().withMessage('Coverage area is required'),
  body('officialWebsite')
    .optional({ checkFalsy: true })
    .isURL().withMessage('Must be a valid URL'),
  body('contactPhone')
    .optional({ checkFalsy: true })
    .matches(/^[0-9+ -]{10,15}$/).withMessage('Must be a valid contact number'),
  body('status')
    .optional()
    .isIn(['Active', 'Upcoming', 'Maintenance']).withMessage('Invalid status')
];

module.exports = {
  validate,
  internetValidation
};
