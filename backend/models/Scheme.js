const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a scheme title'],
      trim: true,
      maxlength: [150, 'Title can not be more than 150 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      unique: true,
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Please add an overview'],
    },
    description: {
      type: String,
      required: [true, 'Please add a short description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    ministry: {
      type: String,
      required: [true, 'Please specify the ministry or department'],
    },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Upcoming'],
      default: 'Active',
    },
    eligibility: {
      type: [String],
      required: [true, 'Please add eligibility criteria'],
      validate: [v => v.length > 0, 'Must have at least one eligibility criterion'],
    },
    benefits: [
      {
        icon: String,
        title: String,
        description: String,
      }
    ],
    documentsRequired: {
      type: [String],
      required: [true, 'Please add required documents'],
    },
    applicationSteps: [
      {
        stepNumber: Number,
        icon: String,
        title: String,
        description: String,
      }
    ],
    features: [String],
    statistics: {
      beneficiaries: String,
      villagesCovered: String,
      statesCovered: String,
      trainingCenters: String,
      customStats: [
        {
          label: String,
          value: String
        }
      ]
    },
    faq: [
      {
        question: String,
        answer: String
      }
    ],
    relatedSchemes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Scheme'
      }
    ],
    officialWebsite: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    applyLink: {
      type: String,
    },
    motto: {
      type: String,
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
        'Digital',
        'Digital Literacy',
        'Internet Access',
        'Digital Services',
        'Other',
      ],
      index: true,
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
schemeSchema.index({ title: 'text', description: 'text', overview: 'text' });

module.exports = mongoose.model('Scheme', schemeSchema);
