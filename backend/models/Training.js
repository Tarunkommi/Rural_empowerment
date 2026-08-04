const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, 'Please add a course name'],
      trim: true,
      maxlength: [150, 'Course name can not be more than 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a course description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    trainer: {
      type: String,
      required: [true, 'Please specify a trainer or organization name'],
    },
    duration: {
      type: String,
      required: [true, 'Please specify the course duration (e.g., 4 Weeks, 2 Months)'],
    },
    level: {
      type: String,
      required: [true, 'Please specify a difficulty level'],
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Please specify the location (e.g., Online, Village Panchayat)'],
    },
    seats: {
      type: Number,
      required: [true, 'Please specify total available seats'],
      min: [1, 'Seats must be at least 1'],
    },
    enrolledCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    certificate: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: 'default-training.jpg',
    },
    status: {
      type: String,
      enum: ['Open', 'Ongoing', 'Completed'],
      default: 'Open',
    }
  },
  {
    timestamps: true,
  }
);

// Virtual for checking if course is full
trainingSchema.virtual('isFull').get(function () {
  return this.enrolledCount >= this.seats;
});

// Ensure virtuals are included in JSON responses
trainingSchema.set('toJSON', { virtuals: true });
trainingSchema.set('toObject', { virtuals: true });

// Text Index for Search functionality
trainingSchema.index({ courseName: 'text', description: 'text', trainer: 'text', location: 'text' });

module.exports = mongoose.model('Training', trainingSchema);
