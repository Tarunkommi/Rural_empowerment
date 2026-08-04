const express = require('express');
const router = express.Router();
const {
  createScheme,
  getAllSchemes,
  getSchemeById,
  updateScheme,
  deleteScheme
} = require('../controllers/scheme.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');
const { validate, schemeValidation } = require('../validators/scheme.validator');
const { USER_ROLES } = require('../utils/constants');

// Public routes
router.route('/')
  .get(getAllSchemes);

router.route('/:id')
  .get(getSchemeById);

// Protected Admin-only routes
router.use(protect);
router.use(authorize(USER_ROLES.ADMIN));

router.route('/')
  .post(upload.single('image'), schemeValidation, validate, createScheme);

router.route('/:id')
  .put(upload.single('image'), schemeValidation, validate, updateScheme)
  .delete(deleteScheme);

module.exports = router;
