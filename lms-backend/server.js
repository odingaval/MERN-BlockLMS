const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',  // Local frontend (Vite default)
  'https://mern-block-mug5hu3fb-odinga-vals-projects.vercel.app', // Your Vercel frontend
].filter(Boolean); // Remove falsy values

app.use(
  cors({
    origin: function (origin, callback) {
      console.log('CORS check:', { origin, allowedOrigins });

      // Allow requests with no origin (curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.error('CORS rejected:', origin);
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.path} | Status: ${res.statusCode} | ${duration}ms`
    );
  });
  next();
});

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Static files (avatars)
app.use('/uploads/avatars', express.static(path.join(__dirname, 'uploads/avatars')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
