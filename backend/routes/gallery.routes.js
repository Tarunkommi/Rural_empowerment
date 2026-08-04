const express = require('express');
const router = express.Router();
const {
  uploadMedia,
  getGallery,
  updateMedia,
  deleteMedia
} = require('../controllers/gallery.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');
const { uploadMemory } = require('../middlewares/upload.middleware');
const { validate, galleryValidation } = require('../validators/gallery.validator');
const { USER_ROLES } = require('../utils/constants');

// Public routes
router.route('/')
  .get(getGallery);

// Protected Admin-only routes
router.use(protect);
router.use(authorize(USER_ROLES.ADMIN));

router.route('/')
  // Use memory storage for direct streaming to cloudinary
  .post(uploadMemory.single('file'), galleryValidation, validate, uploadMedia);

router.route('/:id')
  .put(galleryValidation, validate, updateMedia)
  .delete(deleteMedia);

module.exports = router;
