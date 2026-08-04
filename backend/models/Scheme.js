const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a scheme title'],
      trim: true,
      maxlength: [150, 'Title can not be more than 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    eligibility: {
      type: [String],
      required: [true, 'Please add eligibility criteria'],
      validate: [v => v.length > 0, 'Must have at least one eligibility criterion'],
    },
    benefits: {
      type: [String],
      required: [true, 'Please add scheme benefits'],
      validate: [v => v.length > 0, 'Must have at least one benefit'],
    },
    documentsRequired: {
      type: [String],
      required: [true, 'Please add required documents'],
    },
    applicationProcess: {
      type: String,
      required: [true, 'Please provide the application process description'],
    },
    officialWebsite: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: [
        'Agriculture',
        'Education',
        'Health',
        'Finance',
        'Women Empowerment',
        'Employment',
        'Other',
      ],
      index: true, // Speeds up filtering by category
    },
    image: {
      type: String,
      default: 'no-photo.jpg',
    },
  },
  {
    timestamps: true,
  }
);

// Add Text Index for Search functionality
schemeSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Scheme', schemeSchema);
