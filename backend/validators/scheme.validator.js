const { body } = require('express-validator');
const { validate } = require('./auth.validator'); // Re-use validation runner

const schemeValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Scheme title is required')
    .isLength({ max: 150 }).withMessage('Title cannot exceed 150 characters'),
  body('slug')
    .trim()
    .notEmpty().withMessage('Slug is required'),
  body('overview')
    .trim()
    .notEmpty().withMessage('Overview is required'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('ministry')
    .trim()
    .notEmpty().withMessage('Ministry is required'),
  body('status')
    .optional()
    .isIn(['Active', 'Closed', 'Upcoming']).withMessage('Invalid status'),
  body('eligibility')
    .isArray({ min: 1 }).withMessage('Must provide at least one eligibility criterion'),
  body('benefits')
    .isArray({ min: 1 }).withMessage('Must provide at least one benefit'),
  body('documentsRequired')
    .isArray({ min: 1 }).withMessage('Must provide at least one required document'),
  body('applicationSteps')
    .optional()
    .isArray().withMessage('Application steps must be an array'),
  body('features')
    .optional()
    .isArray().withMessage('Features must be an array'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['Agriculture', 'Education', 'Health', 'Finance', 'Women Empowerment', 'Employment', 'Digital', 'Other'])
    .withMessage('Invalid category'),
  body('officialWebsite')
    .optional({ checkFalsy: true })
    .isURL().withMessage('Must be a valid URL'),
  body('applyLink')
    .optional({ checkFalsy: true })
    .isURL().withMessage('Must be a valid URL')
];

module.exports = {
  validate,
  schemeValidation
};
