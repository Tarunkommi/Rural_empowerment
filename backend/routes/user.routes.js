const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require('../controllers/user.controller');

const { protect } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');
const {
  validate,
  updateProfileValidation,
  changePasswordValidation,
} = require('../validators/user.validator');

// All profile routes require authentication
router.use(protect);

router
  .route('/profile')
  .get(getProfile)
  .put(updateProfileValidation, validate, updateProfile);

router.put('/profile/password', changePasswordValidation, validate, changePassword);

// Apply multer middleware just to the specific image upload endpoint
router.put('/profile/image', upload.single('image'), uploadProfileImage);

module.exports = router;
