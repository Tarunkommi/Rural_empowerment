const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const notFoundHandler = require('./middlewares/notFound.middleware');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Security Middlewares
app.use(helmet()); // Set security HTTP headers

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, 
  legacyHeaders: false, 
});
app.use('/api', limiter); // Apply rate limiting to /api routes

app.use(cors({
  origin: [
    process.env.CORS_ORIGIN,
    'http://localhost:5173',
    'https://digital-india-frontend.onrender.com'
  ].filter(Boolean),
  credentials: true,
}));

// Body & Cookie Parsers
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(express.static('public')); // For public assets like uploads

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Response Compression
app.use(compression());

// Logging Middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const schemeRoutes = require('./routes/scheme.routes');
const literacyRoutes = require('./routes/literacy.routes');
const internetRoutes = require('./routes/internet.routes');
const trainingRoutes = require('./routes/training.routes');
const galleryRoutes = require('./routes/gallery.routes');
const contactRoutes = require('./routes/contact.routes');
// ... other routes

// API Endpoints
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/schemes', schemeRoutes);
app.use('/api/v1/literacy', literacyRoutes);
app.use('/api/v1/internet', internetRoutes);
app.use('/api/v1/training', trainingRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/contact', contactRoutes);

// Root Endpoint
app.use('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Digital India Rural Empowerment Backend API v1'
  });
});

// Handle unknown routes
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
