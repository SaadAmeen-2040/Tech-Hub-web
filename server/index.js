import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars at the very top
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';

// Route files
import auth from './routes/auth.js';
import courses from './routes/courses.js';
import admissions from './routes/admissions.js';
import contacts from './routes/contacts.js';
import teachers from './routes/teachers.js';
import uploads from './routes/uploads.js';
import blogs from './routes/blogs.js';
import events from './routes/events.js';
import analytics from './routes/analytics.js';
import settings from './routes/settings.js';
import notifications from './routes/notifications.js';

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Set security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "blob:", "http://localhost:5000", "https://images.unsplash.com", "https://res.cloudinary.com"],
    },
  },
}));

// Prevent XSS attacks
app.use(xss());

// Sanitize data
app.use(mongoSanitize());

// Enable CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use('/api', limiter);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount routers
app.use('/api/auth', auth);
app.use('/api/courses', courses);
app.use('/api/admissions', admissions);
app.use('/api/contacts', contacts);
app.use('/api/teachers', teachers);
app.use('/api/uploads', uploads);
app.use('/api/blogs', blogs);
app.use('/api/events', events);
app.use('/api/analytics', analytics);
app.use('/api/settings', settings);
app.use('/api/notifications', notifications);

// Error handler
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.message);
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
};

startServer();
