import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (name, email, password, role) => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, role });
  return response.data;
};

export const getCourses = async () => {
  const response = await axios.get(`${API_URL}/courses`);
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axios.get(`${API_URL}/courses/${id}`);
  return response.data;
};

export const enrollInCourse = async (id) => {
  const response = await axios.post(`${API_URL}/courses/${id}/enroll`, {}, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await axios.post(`${API_URL}/courses`, courseData, {
    headers: getAuthHeaders()
  });
  return response.data;
};

export const markLessonComplete = async (courseId, lessonId) => {
  const response = await axios.post(`${API_URL}/users/progress`, { courseId, lessonId }, {
    headers: getAuthHeaders()
  });
  return response.data;
};
