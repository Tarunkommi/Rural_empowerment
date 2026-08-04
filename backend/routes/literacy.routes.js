const express = require('express');
const router = express.Router();
const {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic
} = require('../controllers/literacy.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');
const { validate, literacyValidation } = require('../validators/literacy.validator');
const { USER_ROLES } = require('../utils/constants');

// Public routes (anyone can learn)
router.route('/')
  .get(getAllTopics);

router.route('/:id')
  .get(getTopicById);

// Protected Admin-only routes (only admins can create/update learning materials)
router.use(protect);
router.use(authorize(USER_ROLES.ADMIN));

router.route('/')
  .post(upload.single('image'), literacyValidation, validate, createTopic);

router.route('/:id')
  .put(upload.single('image'), literacyValidation, validate, updateTopic)
  .delete(deleteTopic);

module.exports = router;
