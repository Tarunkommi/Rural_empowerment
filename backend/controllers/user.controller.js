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
    const { 
      name, phone, gender, dateOfBirth, address, 
      state, district, village, pincode, occupation, educationLevel 
    } = req.body;

    // Build the fields to update dynamically
    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (phone) fieldsToUpdate.phone = phone;
    if (gender) fieldsToUpdate.gender = gender;
    if (dateOfBirth) fieldsToUpdate.dateOfBirth = dateOfBirth;
    if (address) fieldsToUpdate.address = address;
    if (state) fieldsToUpdate.state = state;
    if (district) fieldsToUpdate.district = district;
    if (village) fieldsToUpdate.village = village;
    if (pincode) fieldsToUpdate.pincode = pincode;
    if (occupation) fieldsToUpdate.occupation = occupation;
    if (educationLevel) fieldsToUpdate.educationLevel = educationLevel;

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

/**
 * @desc    Get mock user enrolled trainings
 * @route   GET /api/v1/users/trainings
 * @access  Private
 */
exports.getTrainings = async (req, res, next) => {
  try {
    const mockTrainings = [
      {
        id: 1,
        title: "Digital Literacy Basics",
        trainer: "PMGDISHA Initiative",
        progress: 75,
        thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        hasCertificate: false
      },
      {
        id: 2,
        title: "Advanced E-Governance Services",
        trainer: "CSC Academy",
        progress: 100,
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        hasCertificate: true
      }
    ];

    res.status(200).json(new ApiResponse(200, mockTrainings, 'Trainings retrieved'));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get mock user bookmarked schemes
 * @route   GET /api/v1/users/bookmarks
 * @access  Private
 */
exports.getBookmarks = async (req, res, next) => {
  try {
    const mockBookmarks = [
      {
        id: "pmgdisha",
        name: "PMGDISHA",
        description: "Pradhan Mantri Gramin Digital Saksharta Abhiyaan aims to make rural households digitally literate.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Emblem_of_India.svg"
      },
      {
        id: "bharatnet",
        name: "BharatNet",
        description: "Providing high-speed broadband to all Gram Panchayats.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Emblem_of_India.svg"
      }
    ];

    res.status(200).json(new ApiResponse(200, mockBookmarks, 'Bookmarks retrieved'));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get mock user activity history
 * @route   GET /api/v1/users/activity
 * @access  Private
 */
exports.getActivity = async (req, res, next) => {
  try {
    const mockActivity = [
      { id: 1, action: "Updated Profile", date: new Date().toISOString() },
      { id: 2, action: "Completed 'Advanced E-Governance Services'", date: new Date(Date.now() - 86400000).toISOString() },
      { id: 3, action: "Bookmarked PMGDISHA Scheme", date: new Date(Date.now() - 172800000).toISOString() },
      { id: 4, action: "Logged In", date: new Date(Date.now() - 259200000).toISOString() },
    ];

    res.status(200).json(new ApiResponse(200, mockActivity, 'Activity retrieved'));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user account (mock)
 * @route   DELETE /api/v1/users/account
 * @access  Private
 */
exports.deleteAccount = async (req, res, next) => {
  try {
    // We will just return success for now.
    res.status(200).json(new ApiResponse(200, null, 'Account deleted successfully'));
  } catch (error) {
    next(error);
  }
};
