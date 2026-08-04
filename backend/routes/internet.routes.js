const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controllers/internet.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');
const { validate, internetValidation } = require('../validators/internet.validator');
const { USER_ROLES } = require('../utils/constants');

// Public routes (anyone can view internet initiatives)
router.route('/')
  .get(getAllServices);

router.route('/:id')
  .get(getServiceById);

// Protected Admin-only routes
router.use(protect);
router.use(authorize(USER_ROLES.ADMIN));

router.route('/')
  .post(upload.single('image'), internetValidation, validate, createService);

router.route('/:id')
  .put(upload.single('image'), internetValidation, validate, updateService)
  .delete(deleteService);

module.exports = router;
