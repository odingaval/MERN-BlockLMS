import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getCourses } from '../api';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';

const Landing = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to BlockLMS
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Learn from the best, anywhere, anytime.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button component={RouterLink} to="/login" variant="contained" color="primary" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button component={RouterLink} to="/signup" variant="outlined" color="primary">
            Sign Up
          </Button>
        </Box>
      </Box>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
        Featured Courses
      </Typography>

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}
      
      <Grid container spacing={4}>
      {courses.map(course => (
          <Grid item key={course._id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {course.title}
                </Typography>
                <Typography>
                  {course.description}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                  Educator: {course.educator}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to={`/course/${course._id}`} size="small">View Course</Button>
              </CardActions>
            </Card>
          </Grid>
      ))}
      </Grid>
    </Container>
);
};

export default Landing;
