const { body } = require('express-validator');
const { validate } = require('./auth.validator'); // Re-use validation runner

const schemeValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Scheme title is required')
    .isLength({ max: 150 }).withMessage('Title cannot exceed 150 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  body('eligibility')
    .isArray({ min: 1 }).withMessage('Must provide at least one eligibility criterion'),
  body('benefits')
    .isArray({ min: 1 }).withMessage('Must provide at least one benefit'),
  body('documentsRequired')
    .isArray({ min: 1 }).withMessage('Must provide at least one required document'),
  body('applicationProcess')
    .trim()
    .notEmpty().withMessage('Application process is required'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['Agriculture', 'Education', 'Health', 'Finance', 'Women Empowerment', 'Employment', 'Other'])
    .withMessage('Invalid category'),
  body('officialWebsite')
    .optional({ checkFalsy: true })
    .isURL().withMessage('Must be a valid URL')
];

module.exports = {
  validate,
  schemeValidation
};
