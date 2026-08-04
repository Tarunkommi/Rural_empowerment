const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Get current logged in user profile
 * @route   GET /api/v1/users/profile
 * @access  Private
 */
exports.getProfile = async (req, res, next) => {
  try {
    // req.user is already populated by the protect middleware
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    res.status(200).json(
      new ApiResponse(200, user, 'Profile retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile details
 * @route   PUT /api/v1/users/profile
 * @access  Private
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    // Build the fields to update dynamically
    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (phone) fieldsToUpdate.phone = phone;

    // Check if new phone is already registered to someone else
    if (phone) {
      const phoneExists = await User.findOne({ phone, _id: { $ne: req.user.id } });
      if (phoneExists) {
        return next(new ApiError(400, 'Phone number already in use by another account'));
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true, // return the modified document rather than the original
        runValidators: true, // validate before update
      }
    );

    res.status(200).json(
      new ApiResponse(200, updatedUser, 'Profile updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Change user password
 * @route   PUT /api/v1/users/profile/password
 * @access  Private
 */
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Explicitly select password field since it's `select: false` by default
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return next(new ApiError(401, 'Incorrect current password'));
    }

    // Update password
    user.password = newPassword;
    await user.save(); // This will trigger the pre('save') hook to hash the new password

    res.status(200).json(
      new ApiResponse(200, null, 'Password changed successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload/Update profile image
 * @route   PUT /api/v1/users/profile/image
 * @access  Private
 */
exports.uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ApiError(400, 'Please upload an image file'));
    }

    // The file URL relative path that will be served by express.static
    const imagePath = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imagePath },
      { new: true }
    );

    res.status(200).json(
      new ApiResponse(200, { profileImage: updatedUser.profileImage }, 'Profile image uploaded successfully')
    );
  } catch (error) {
    next(error);
  }
};
