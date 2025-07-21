import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getCourses } from '../api';
import { useAuth } from '../AuthContext';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button
} from '@mui/material';

const DashboardStudent = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;
      try {
        const data = await getCourses();
        const enrolled = data.filter(course =>
          course.enrolledStudents && course.enrolledStudents.includes(user.id)
        );
        setCourses(enrolled);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Dashboard
        </Typography>
        <Typography variant="h6">
          Welcome back, {user?.name || 'Student'}!
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Your Enrolled Courses
        </Typography>
        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <List>
            {courses.length > 0 ? (
              courses.map(course => (
                <ListItem
                  key={course._id}
                  secondaryAction={
                    <Button component={RouterLink} to={`/course/${course._id}`} edge="end">
                      Go to Course
                    </Button>
                  }
                >
                  <ListItemText
                    primary={course.title}
                    secondary={`Educator: ${course.educator}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>You are not enrolled in any courses yet.</Typography>
            )}
          </List>
        )}
      </Paper>
    </Container>
);
};

export default DashboardStudent;
