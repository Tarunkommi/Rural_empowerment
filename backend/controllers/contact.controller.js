const Contact = require('../models/Contact');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const ApiFeatures = require('../utils/ApiFeatures');
const sendEmail = require('../utils/sendEmail');
const env = require('../config/env');

/**
 * @desc    Submit a new contact message
 * @route   POST /api/v1/contact
 * @access  Public
 */
exports.submitMessage = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    // Send an automated confirmation email to the user (fire and forget)
    try {
      await sendEmail({
        email: contact.email,
        subject: `We received your message: ${contact.subject}`,
        message: `Hello ${contact.name},\n\nThank you for reaching out to the Digital India Rural Portal. We have received your message and our team will get back to you shortly.\n\nYour message:\n"${contact.message}"\n\nRegards,\nThe Support Team`
      });
    } catch (err) {
      console.error('Failed to send confirmation email', err);
      // We don't fail the request if the email fails to send, as the DB save succeeded
    }

    res.status(201).json(
      new ApiResponse(201, contact, 'Message submitted successfully. You will receive an email confirmation.')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact messages (Admin View)
 * @route   GET /api/v1/contact
 * @access  Private/Admin
 */
exports.getMessages = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Contact.find(), req.query)
      .search(['name', 'email', 'subject'])
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const messages = await features.query;
    const totalMessages = await Contact.countDocuments();

    res.status(200).json(
      new ApiResponse(200, {
        count: messages.length,
        total: totalMessages,
        data: messages
      }, 'Messages retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update message status
 * @route   PUT /api/v1/contact/:id
 * @access  Private/Admin
 */
exports.updateMessageStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['New', 'In Progress', 'Resolved'].includes(status)) {
        return next(new ApiError(400, 'Invalid status update'));
    }

    const message = await Contact.findByIdAndUpdate(
        req.params.id, 
        { status }, 
        { new: true, runValidators: true }
    );

    if (!message) {
      return next(new ApiError(404, `Message not found with id of ${req.params.id}`));
    }

    res.status(200).json(
      new ApiResponse(200, message, 'Message status updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a message
 * @route   DELETE /api/v1/contact/:id
 * @access  Private/Admin
 */
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return next(new ApiError(404, `Message not found with id of ${req.params.id}`));
    }

    await message.deleteOne();

    res.status(200).json(
      new ApiResponse(200, {}, 'Message deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
