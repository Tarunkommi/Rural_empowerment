const mongoose = require('mongoose');

const literacySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the literacy topic'],
      trim: true,
      maxlength: [150, 'Title can not be more than 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a brief description'],
      maxlength: [500, 'Description can not be more than 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please add detailed content (HTML or Markdown)'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: [
        'Smartphone Basics',
        'Internet',
        'Email',
        'Digital Payments',
        'DigiLocker',
        'Aadhaar',
        'Cyber Security',
      ],
      index: true,
    },
    videoUrl: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL for the video (e.g., YouTube link)',
      ],
    },
    image: {
      type: String,
      default: 'default-literacy.png',
    },
    readingTime: {
      type: Number, // in minutes
      min: [1, 'Reading time must be at least 1 minute'],
    },
    isPublished: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

// Add Text Index for Search functionality
literacySchema.index({ title: 'text', description: 'text', content: 'text' });

module.exports = mongoose.model('Literacy', literacySchema);
