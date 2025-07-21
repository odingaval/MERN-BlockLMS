const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you'll create this

// GET /api/courses - get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/courses - create a new course (protected, educator only)
router.post('/', authMiddleware, async (req, res) => {
  if (req.user.role !== 'educator') {
    return res.status(403).json({ message: 'Forbidden: Educators only' });
  }

  const { title, description, lessons } = req.body;
  if (!title || !description || !Array.isArray(lessons)) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const newCourse = new Course({
      title,
      description,
      educator: req.user.name, // Automatically set from token
      lessons
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/courses/:id - get a single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/courses/:id/enroll - enroll a student in a course
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Add student to enrolled list if not already there
    if (!course.enrolledStudents.includes(req.user.id)) {
      course.enrolledStudents.push(req.user.id);
      await course.save();
    }

    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 