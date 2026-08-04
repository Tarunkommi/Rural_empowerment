const Scheme = require('../models/Scheme');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const ApiFeatures = require('../utils/ApiFeatures');

/**
 * @desc    Create new scheme
 * @route   POST /api/v1/schemes
 * @access  Private/Admin
 */
exports.createScheme = async (req, res, next) => {
  try {
    const schemeData = { ...req.body };

    // If an image was uploaded via multer, set the path
    if (req.file) {
      schemeData.image = `/uploads/${req.file.filename}`;
    }

    const scheme = await Scheme.create(schemeData);

    res.status(201).json(
      new ApiResponse(201, scheme, 'Scheme created successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all schemes (with pagination, filtering, search, sorting)
 * @route   GET /api/v1/schemes
 * @access  Public
 */
exports.getAllSchemes = async (req, res, next) => {
  try {
    // Build query using our robust ApiFeatures utility
    const features = new ApiFeatures(Scheme.find(), req.query)
      .search(['title', 'description', 'category']) // Search across these fields
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Execute query
    const schemes = await features.query;

    // Get total count for pagination metadata
    const totalSchemes = await Scheme.countDocuments();

    res.status(200).json(
      new ApiResponse(200, {
        count: schemes.length,
        total: totalSchemes,
        data: schemes
      }, 'Schemes retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single scheme by ID
 * @route   GET /api/v1/schemes/:id
 * @access  Public
 */
exports.getSchemeById = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return next(new ApiError(404, `Scheme not found with id of ${req.params.id}`));
    }

    res.status(200).json(
      new ApiResponse(200, scheme, 'Scheme retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update scheme
 * @route   PUT /api/v1/schemes/:id
 * @access  Private/Admin
 */
exports.updateScheme = async (req, res, next) => {
  try {
    let scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return next(new ApiError(404, `Scheme not found with id of ${req.params.id}`));
    }

    const updateData = { ...req.body };

    // Update image if a new one is uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    scheme = await Scheme.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json(
      new ApiResponse(200, scheme, 'Scheme updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete scheme
 * @route   DELETE /api/v1/schemes/:id
 * @access  Private/Admin
 */
exports.deleteScheme = async (req, res, next) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return next(new ApiError(404, `Scheme not found with id of ${req.params.id}`));
    }

    // Using deleteOne instead of remove() as remove() is deprecated in newer Mongoose
    await scheme.deleteOne();

    res.status(200).json(
      new ApiResponse(200, {}, 'Scheme deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
