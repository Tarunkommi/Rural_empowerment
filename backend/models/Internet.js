const mongoose = require('mongoose');

const internetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the internet service/initiative'],
      trim: true,
      maxlength: [150, 'Title can not be more than 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description of the service'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: [
        'BharatNet',
        'PM-WANI',
        'Public Wi-Fi',
        'Mobile Connectivity',
        'Rural Internet Centers',
        'Other'
      ],
      index: true, // Speeds up filtering
    },
    providerName: {
      type: String,
      trim: true,
      default: 'Government/Public',
    },
    coverageArea: {
      type: String,
      required: [true, 'Please specify the target coverage area (e.g., Pan-India, State specific, Gram Panchayat level)'],
    },
    officialWebsite: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    contactPhone: {
      type: String,
      match: [/^[0-9+ -]{10,15}$/, 'Please provide a valid contact number'],
    },
    status: {
      type: String,
      enum: ['Active', 'Upcoming', 'Maintenance'],
      default: 'Active',
    },
    image: {
      type: String,
      default: 'default-internet.jpg',
    }
  },
  {
    timestamps: true,
  }
);

// Add Text Index for Search functionality across title and description
internetSchema.index({ title: 'text', description: 'text', providerName: 'text' });

module.exports = mongoose.model('Internet', internetSchema);
