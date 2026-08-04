const { body } = require('express-validator');
const { validate } = require('./auth.validator');

const galleryValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('mediaType')
    .optional() // Might be inferred in the controller based on mimetype, but validating if present
    .isIn(['Image', 'Video']).withMessage('Media type must be either Image or Video')
];

module.exports = {
  validate,
  galleryValidation
};
