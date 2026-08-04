const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the media'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    mediaUrl: {
      type: String,
      required: [true, 'Media URL is required'],
    },
    publicId: {
      type: String,
      required: [true, 'Cloudinary public ID is required for deletion'],
    },
    mediaType: {
      type: String,
      required: [true, 'Please specify the media type'],
      enum: ['Image', 'Video'],
      index: true,
    }
  },
  {
    timestamps: true,
  }
);

// Text Index for Search functionality
gallerySchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Gallery', gallerySchema);
