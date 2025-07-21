import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getCourseById } from '../api';
import { useAuth } from '../AuthContext';
import { markLessonComplete } from '../api';
import toast from 'react-hot-toast';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Breadcrumbs,
  Link,
  Button
} from '@mui/material';

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const { user, isAuthenticated, updateUserProgress } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isCompleted = user?.progress
    ?.find(p => p.courseId === courseId)
    ?.completedLessons.includes(lessonId);

  const handleMarkComplete = async () => {
    toast.dismiss();
    try {
      const { progress } = await markLessonComplete(courseId, lessonId);
      updateUserProgress(progress);
      toast.success('Lesson marked as complete!');
    } catch (err) {
      toast.error('Failed to mark lesson as complete.');
    }
  };

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
        const currentLesson = courseData.lessons.find(l => l.id === lessonId);
        if (currentLesson) {
          setLesson(currentLesson);
        } else {
          setError('Lesson not found.');
        }
      } catch (err) {
        setError('Failed to load lesson data.');
      } finally {
        setLoading(false);
      }
    };
    fetchLessonData();
  }, [courseId, lessonId]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!lesson || !course) return null;

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, my: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component={RouterLink} underline="hover" color="inherit" to={`/course/${courseId}`}>
            {course.title}
          </Link>
          <Typography color="text.primary">{lesson.title}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" component="h1" gutterBottom>
          {lesson.title}
        </Typography>
        {isAuthenticated && user?.role === 'student' && (
          <Button
            variant="contained"
            onClick={handleMarkComplete}
            disabled={isCompleted}
            sx={{ mb: 2 }}
          >
            {isCompleted ? 'Completed' : 'Mark as Complete'}
          </Button>
        )}
        <Typography paragraph>
          {lesson.content || 'No content has been added for this lesson yet.'}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Lesson;
