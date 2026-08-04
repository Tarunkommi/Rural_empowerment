const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  submitMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/contact.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');
const { validate, contactValidation } = require('../validators/contact.validator');
const { USER_ROLES } = require('../utils/constants');

// Rate limiting for the contact route (Spam Protection)
// Limit each IP to 5 contact submissions per hour
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: 'Too many messages sent from this IP, please try again after an hour'
  }
});

// Public route to submit a message (with rate limit applied)
router.route('/')
  .post(contactLimiter, contactValidation, validate, submitMessage);

// Protected Admin-only routes for managing messages
router.use(protect);
router.use(authorize(USER_ROLES.ADMIN));

router.route('/')
  .get(getMessages);

router.route('/:id')
  .put(updateMessageStatus)
  .delete(deleteMessage);

module.exports = router;
