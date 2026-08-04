const nodemailer = require('nodemailer');
const env = require('../config/env');

const sendEmail = async (options) => {
  // Create a reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });

  // Setup email data
  const message = {
    from: `${env.smtp.fromName} <${env.smtp.fromEmail}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML template
  };

  // Send mail
  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
