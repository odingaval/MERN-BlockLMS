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
  Button,
  Divider
} from '@mui/material';

const DashboardEducator = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;
      try {
        const data = await getCourses();
        const created = data.filter(course => course.educator === user.name);
        setCourses(created);
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
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1">
            Educator Dashboard
          </Typography>
          <Typography variant="h6">
            Welcome back, {user?.name || 'Educator'}!
          </Typography>
        </Box>
        <Button component={RouterLink} to="/courses/create" variant="contained" color="primary">
          Create New Course
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Your Created Courses
        </Typography>
        <Divider />
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
                      View
                    </Button>
                  }
                >
                  <ListItemText primary={course.title} />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ p: 2 }}>You have not created any courses yet.</Typography>
            )}
          </List>
        )}
      </Paper>
    </Container>
);
};

export default DashboardEducator;
