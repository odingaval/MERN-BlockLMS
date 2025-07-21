const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Set up multer for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/avatars'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.user.id + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage });

// POST /api/users/progress - Mark a lesson as complete
router.post('/progress', authMiddleware, async (req, res) => {
  const { courseId, lessonId } = req.body;
  const userId = req.user.id;

  if (!courseId || !lessonId) {
    return res.status(400).json({ message: 'Course ID and Lesson ID are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const courseProgress = user.progress.find(p => p.courseId.toString() === courseId);

    if (courseProgress) {
      // If course progress exists, add lesson if it's not already there
      if (!courseProgress.completedLessons.includes(lessonId)) {
        courseProgress.completedLessons.push(lessonId);
      }
    } else {
      // If no progress for this course, create it
      user.progress.push({ courseId, completedLessons: [lessonId] });
    }

    await user.save();
    res.json({ message: 'Progress updated successfully', progress: user.progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user's profile
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Update current user's profile
router.put('/me', authMiddleware, async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
  res.json(user);
});

// Upload avatar
router.post('/me/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  const user = await User.findByIdAndUpdate(req.user.id, { avatar: avatarUrl }, { new: true }).select('-password');
  res.json({ avatar: avatarUrl, user });
});

module.exports = router; 