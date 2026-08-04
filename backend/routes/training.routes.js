const express = require('express');
const router = express.Router();
const {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram
} = require('../controllers/training.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/upload.middleware');
const { validate, trainingValidation } = require('../validators/training.validator');
const { USER_ROLES } = require('../utils/constants');

// Public routes (anyone can view training programs)
router.route('/')
  .get(getAllPrograms);

router.route('/:id')
  .get(getProgramById);

// Protected Admin-only routes
router.use(protect);
router.use(authorize(USER_ROLES.ADMIN));

router.route('/')
  .post(upload.single('image'), trainingValidation, validate, createProgram);

router.route('/:id')
  .put(upload.single('image'), trainingValidation, validate, updateProgram)
  .delete(deleteProgram);

module.exports = router;
