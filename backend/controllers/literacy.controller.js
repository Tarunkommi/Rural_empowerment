const Literacy = require('../models/Literacy');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const ApiFeatures = require('../utils/ApiFeatures');

/**
 * @desc    Create new literacy topic
 * @route   POST /api/v1/literacy
 * @access  Private/Admin
 */
exports.createTopic = async (req, res, next) => {
  try {
    const topicData = { ...req.body };

    if (req.file) {
      topicData.image = `/uploads/${req.file.filename}`;
    }

    const topic = await Literacy.create(topicData);

    res.status(201).json(
      new ApiResponse(201, topic, 'Digital Literacy topic created successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all literacy topics (with pagination, filtering, search)
 * @route   GET /api/v1/literacy
 * @access  Public
 */
exports.getAllTopics = async (req, res, next) => {
  try {
    // Only return published topics for regular users, admin could pass a flag to see all
    let baseQuery = Literacy.find();
    if (req.user?.role !== 'ADMIN') {
      baseQuery = Literacy.find({ isPublished: true });
    }

    const features = new ApiFeatures(baseQuery, req.query)
      .search(['title', 'description', 'content'])
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const topics = await features.query;
    const totalTopics = await Literacy.countDocuments(baseQuery._conditions);

    res.status(200).json(
      new ApiResponse(200, {
        count: topics.length,
        total: totalTopics,
        data: topics
      }, 'Literacy topics retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single topic by ID
 * @route   GET /api/v1/literacy/:id
 * @access  Public
 */
exports.getTopicById = async (req, res, next) => {
  try {
    const topic = await Literacy.findById(req.params.id);

    if (!topic) {
      return next(new ApiError(404, `Topic not found with id of ${req.params.id}`));
    }

    res.status(200).json(
      new ApiResponse(200, topic, 'Topic retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update topic
 * @route   PUT /api/v1/literacy/:id
 * @access  Private/Admin
 */
exports.updateTopic = async (req, res, next) => {
  try {
    let topic = await Literacy.findById(req.params.id);

    if (!topic) {
      return next(new ApiError(404, `Topic not found with id of ${req.params.id}`));
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    topic = await Literacy.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json(
      new ApiResponse(200, topic, 'Topic updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete topic
 * @route   DELETE /api/v1/literacy/:id
 * @access  Private/Admin
 */
exports.deleteTopic = async (req, res, next) => {
  try {
    const topic = await Literacy.findById(req.params.id);

    if (!topic) {
      return next(new ApiError(404, `Topic not found with id of ${req.params.id}`));
    }

    await topic.deleteOne();

    res.status(200).json(
      new ApiResponse(200, {}, 'Topic deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
