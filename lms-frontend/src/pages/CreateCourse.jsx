import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../api';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  Alert,
  Divider
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import toast from 'react-hot-toast';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lessons, setLessons] = useState([{ id: '1', title: '', content: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLessonChange = (index, field, value) => {
    const newLessons = [...lessons];
    newLessons[index][field] = value;
    setLessons(newLessons);
  };

  const addLesson = () => {
    setLessons([...lessons, { id: `${Date.now()}`, title: '', content: '' }]);
  };

  const removeLesson = (index) => {
    const newLessons = lessons.filter((_, i) => i !== index);
    setLessons(newLessons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (!title || !description || lessons.some(l => !l.title)) {
      toast.error('Please fill in all required fields, including lesson titles.');
      return;
    }
    setLoading(true);
    try {
      await createCourse({ title, description, lessons });
      toast.success('Course created successfully!');
      navigate('/dashboard/educator');
    } catch (err) {
      toast.error('Course creation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New Course
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            label="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" component="h2" gutterBottom>
            Lessons
          </Typography>

          {lessons.map((lesson, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1, position: 'relative' }}>
              <TextField
                label={`Lesson ${index + 1} Title`}
                value={lesson.title}
                onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                fullWidth
                required
                margin="dense"
              />
              <TextField
                label="Lesson Content"
                value={lesson.content}
                onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
                fullWidth
                multiline
                rows={2}
                margin="dense"
              />
              <IconButton
                onClick={() => removeLesson(index)}
                sx={{ position: 'absolute', top: 5, right: 5 }}
                size="small"
                disabled={lessons.length === 1}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          ))}

          <Button startIcon={<AddCircleOutlineIcon />} onClick={addLesson} sx={{ mt: 1 }}>
            Add Lesson
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 4 }}
          >
            {loading ? 'Creating Course...' : 'Create Course'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateCourse; 