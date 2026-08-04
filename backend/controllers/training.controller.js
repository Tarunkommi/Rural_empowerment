const Training = require('../models/Training');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const ApiFeatures = require('../utils/ApiFeatures');

/**
 * @desc    Create new training program
 * @route   POST /api/v1/training
 * @access  Private/Admin
 */
exports.createProgram = async (req, res, next) => {
  try {
    const programData = { ...req.body };

    if (req.file) {
      programData.image = `/uploads/${req.file.filename}`;
    }

    const program = await Training.create(programData);

    res.status(201).json(
      new ApiResponse(201, program, 'Training program created successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all training programs (with pagination, filtering, search)
 * @route   GET /api/v1/training
 * @access  Public
 */
exports.getAllPrograms = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Training.find(), req.query)
      .search(['courseName', 'description', 'trainer', 'location'])
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const programs = await features.query;
    const totalPrograms = await Training.countDocuments();

    res.status(200).json(
      new ApiResponse(200, {
        count: programs.length,
        total: totalPrograms,
        data: programs
      }, 'Training programs retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single training program by ID
 * @route   GET /api/v1/training/:id
 * @access  Public
 */
exports.getProgramById = async (req, res, next) => {
  try {
    const program = await Training.findById(req.params.id);

    if (!program) {
      return next(new ApiError(404, `Training program not found with id of ${req.params.id}`));
    }

    res.status(200).json(
      new ApiResponse(200, program, 'Training program retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update training program
 * @route   PUT /api/v1/training/:id
 * @access  Private/Admin
 */
exports.updateProgram = async (req, res, next) => {
  try {
    let program = await Training.findById(req.params.id);

    if (!program) {
      return next(new ApiError(404, `Training program not found with id of ${req.params.id}`));
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // Do not allow manual override of enrolledCount via standard update to prevent admin mistakes
    if (updateData.enrolledCount) {
        delete updateData.enrolledCount;
    }

    program = await Training.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json(
      new ApiResponse(200, program, 'Training program updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete training program
 * @route   DELETE /api/v1/training/:id
 * @access  Private/Admin
 */
exports.deleteProgram = async (req, res, next) => {
  try {
    const program = await Training.findById(req.params.id);

    if (!program) {
      return next(new ApiError(404, `Training program not found with id of ${req.params.id}`));
    }

    await program.deleteOne();

    res.status(200).json(
      new ApiResponse(200, {}, 'Training program deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
