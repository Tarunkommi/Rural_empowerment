const Gallery = require('../models/Gallery');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const ApiFeatures = require('../utils/ApiFeatures');
const cloudinaryHelper = require('../utils/cloudinaryHelper');

/**
 * @desc    Upload new media to gallery
 * @route   POST /api/v1/gallery
 * @access  Private/Admin
 */
exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ApiError(400, 'Please upload an image or video file'));
    }

    const isVideo = req.file.mimetype.startsWith('video/');
    const mediaType = isVideo ? 'Video' : 'Image';
    const resourceType = isVideo ? 'video' : 'image';

    // Stream buffer to Cloudinary
    const cloudResponse = await cloudinaryHelper.uploadStream(req.file.buffer, 'gallery', resourceType);

    const galleryData = {
      title: req.body.title,
      description: req.body.description,
      mediaType: mediaType,
      mediaUrl: cloudResponse.secure_url,
      publicId: cloudResponse.public_id
    };

    const media = await Gallery.create(galleryData);

    res.status(201).json(
      new ApiResponse(201, media, 'Media uploaded successfully to Gallery')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all gallery media
 * @route   GET /api/v1/gallery
 * @access  Public
 */
exports.getGallery = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Gallery.find(), req.query)
      .search(['title', 'description'])
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const media = await features.query;
    const totalMedia = await Gallery.countDocuments();

    res.status(200).json(
      new ApiResponse(200, {
        count: media.length,
        total: totalMedia,
        data: media
      }, 'Gallery retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update media details (title, description)
 * @route   PUT /api/v1/gallery/:id
 * @access  Private/Admin
 */
exports.updateMedia = async (req, res, next) => {
  try {
    const media = await Gallery.findById(req.params.id);

    if (!media) {
      return next(new ApiError(404, `Media not found with id of ${req.params.id}`));
    }

    // Do not allow updating the actual file or URL via this route
    const updateData = {
      title: req.body.title,
      description: req.body.description
    };

    const updatedMedia = await Gallery.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json(
      new ApiResponse(200, updatedMedia, 'Media details updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete media
 * @route   DELETE /api/v1/gallery/:id
 * @access  Private/Admin
 */
exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await Gallery.findById(req.params.id);

    if (!media) {
      return next(new ApiError(404, `Media not found with id of ${req.params.id}`));
    }

    const resourceType = media.mediaType === 'Video' ? 'video' : 'image';

    // Delete from Cloudinary first
    await cloudinaryHelper.deleteAsset(media.publicId, resourceType);

    // Delete from DB
    await media.deleteOne();

    res.status(200).json(
      new ApiResponse(200, {}, 'Media deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
