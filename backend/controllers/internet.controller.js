const Internet = require('../models/Internet');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const ApiFeatures = require('../utils/ApiFeatures');

/**
 * @desc    Create new internet access service
 * @route   POST /api/v1/internet
 * @access  Private/Admin
 */
exports.createService = async (req, res, next) => {
  try {
    const serviceData = { ...req.body };

    if (req.file) {
      serviceData.image = `/uploads/${req.file.filename}`;
    }

    const service = await Internet.create(serviceData);

    res.status(201).json(
      new ApiResponse(201, service, 'Internet service created successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all internet services (with pagination, filtering, search)
 * @route   GET /api/v1/internet
 * @access  Public
 */
exports.getAllServices = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Internet.find(), req.query)
      .search(['title', 'description', 'providerName', 'category'])
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const services = await features.query;
    const totalServices = await Internet.countDocuments();

    res.status(200).json(
      new ApiResponse(200, {
        count: services.length,
        total: totalServices,
        data: services
      }, 'Internet services retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single internet service by ID
 * @route   GET /api/v1/internet/:id
 * @access  Public
 */
exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Internet.findById(req.params.id);

    if (!service) {
      return next(new ApiError(404, `Internet service not found with id of ${req.params.id}`));
    }

    res.status(200).json(
      new ApiResponse(200, service, 'Internet service retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update internet service
 * @route   PUT /api/v1/internet/:id
 * @access  Private/Admin
 */
exports.updateService = async (req, res, next) => {
  try {
    let service = await Internet.findById(req.params.id);

    if (!service) {
      return next(new ApiError(404, `Internet service not found with id of ${req.params.id}`));
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    service = await Internet.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json(
      new ApiResponse(200, service, 'Internet service updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete internet service
 * @route   DELETE /api/v1/internet/:id
 * @access  Private/Admin
 */
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Internet.findById(req.params.id);

    if (!service) {
      return next(new ApiError(404, `Internet service not found with id of ${req.params.id}`));
    }

    await service.deleteOne();

    res.status(200).json(
      new ApiResponse(200, {}, 'Internet service deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
