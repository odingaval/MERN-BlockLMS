const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:5173', // Local frontend (Vite default)
  process.env.CLIENT_URL,  // Your Vercel frontend URL (e.g., https://your-app.vercel.app)
].filter(Boolean); // Remove falsy values (e.g., if CLIENT_URL is undefined)

// Enhanced CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      console.log('CORS check:', { origin, allowedOrigins });
      
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error('CORS rejected:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Enable if using cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Required for auth tokens
  })
);

// Middleware
app.use(express.json());

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

// Serve static files (avatars)
app.use('/uploads/avatars', express.static(path.join(__dirname, 'uploads/avatars')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));