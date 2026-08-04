const { body } = require('express-validator');
const { validate } = require('./auth.validator'); // Re-use the validation runner

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Name cannot be empty if provided')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  body('phone')
    .optional()
    .trim()
    .notEmpty().withMessage('Phone number cannot be empty if provided')
    .matches(/^[6-9]\d{9}$/).withMessage('Please provide a valid 10-digit Indian phone number'),
  body('gender').optional().isIn(['Male', 'Female', 'Other', 'Prefer not to say']).withMessage('Invalid gender'),
  body('dateOfBirth').optional().isISO8601().toDate().withMessage('Invalid date format'),
  body('address').optional().trim().isLength({ max: 200 }).withMessage('Address cannot exceed 200 characters'),
  body('state').optional().trim(),
  body('district').optional().trim(),
  body('village').optional().trim(),
  body('pincode').optional().trim().matches(/^[1-9][0-9]{5}$/).withMessage('Valid 6-digit PIN code required'),
  body('occupation').optional().trim(),
  body('educationLevel').optional().trim(),
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
];

module.exports = {
  validate,
  updateProfileValidation,
  changePasswordValidation,
};
