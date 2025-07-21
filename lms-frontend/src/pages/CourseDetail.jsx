import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getCourseById, enrollInCourse } from '../api';
import { useAuth } from '../AuthContext';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress
} from '@mui/material';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCourse = async () => {
    try {
      const data = await getCourseById(courseId);
      setCourse(data);
    } catch (err) {
      setError('Failed to load course details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    toast.dismiss();
    try {
      await enrollInCourse(courseId);
      toast.success('Successfully enrolled!');
      await fetchCourse(); // Refresh course data
    } catch (err) {
      toast.error('Enrollment failed. Please try again.');
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!course) return null;

  const isEnrolled = user && course.enrolledStudents.includes(user.id);

  const courseProgress = user?.progress?.find(p => p.courseId === courseId);
  const completedLessons = courseProgress?.completedLessons?.length || 0;
  const totalLessons = course?.lessons?.length || 0;
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Educator: {course.educator}
        </Typography>
        <Typography paragraph sx={{ my: 2 }}>
          {course.description}
        </Typography>

        {isAuthenticated && user?.role === 'student' && (
          <Button onClick={handleEnroll} variant="contained" disabled={isEnrolled} sx={{ mb: 2 }}>
            {isEnrolled ? 'Enrolled' : 'Enroll Now'}
          </Button>
        )}
      </Paper>

      <Paper sx={{ p: 2, my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Lessons
        </Typography>
        <Divider />
        <List>
          {course.lessons && course.lessons.length > 0 ? (
            course.lessons.map(lesson => (
              <ListItem button component={RouterLink} to={`/course/${courseId}/lesson/${lesson.id}`} key={lesson.id}>
                <ListItemText primary={lesson.title} />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ p: 2 }}>No lessons available yet.</Typography>
          )}
        </List>
      </Paper>

      {isEnrolled && (
        <Paper sx={{ p: 2, my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Your Progress
          </Typography>
          <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 10, borderRadius: 5 }} />
          <Typography sx={{ mt: 1 }}>{Math.round(progressPercent)}% Complete</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default CourseDetail;
