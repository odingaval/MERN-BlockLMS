import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardStudent from './pages/DashboardStudent';
import DashboardEducator from './pages/DashboardEducator';
import CourseDetail from './pages/CourseDetail';
import CreateCourse from './pages/CreateCourse';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="course/:courseId" element={<CourseDetail />} />
          <Route path="course/:courseId/lesson/:lessonId" element={<Lesson />} />
          <Route path="profile" element={<Profile />} />

          {/* Private Student Routes */}
          <Route element={<PrivateRoute roles={['student']} />}>
            <Route path="dashboard/student" element={<DashboardStudent />} />
          </Route>

          {/* Private Educator Routes */}
          <Route element={<PrivateRoute roles={['educator']} />}>
            <Route path="dashboard/educator" element={<DashboardEducator />} />
            <Route path="courses/create" element={<CreateCourse />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
