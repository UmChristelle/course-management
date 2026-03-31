import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK = true; // Set to false when backend is available

// Mock data
let mockCourses = [
  {
    id: 1,
    title: 'Introduction to Computer Science',
    description: 'Learn the basics of programming and computer science fundamentals.',
    credits: 3,
    instructor: 'Dr. John Smith',
    schedule: 'Mon/Wed 10:00-11:30 AM'
  },
  {
    id: 2,
    title: 'Data Structures and Algorithms',
    description: 'Advanced programming concepts and algorithm design.',
    credits: 4,
    instructor: 'Prof. Jane Doe',
    schedule: 'Tue/Thu 2:00-3:30 PM'
  },
  {
    id: 3,
    title: 'Web Development',
    description: 'Build modern web applications using HTML, CSS, and JavaScript.',
    credits: 3,
    instructor: 'Dr. Alice Johnson',
    schedule: 'Mon/Wed/Fri 1:00-2:00 PM'
  }
];

let nextId = 4;

// Utility function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const login = async (email, password) => {
  if (USE_MOCK) {
    await delay(500); // Simulate network delay
    if (email === 'admin@example.com' && password === 'adminpassword123') {
      return { token: 'mock-jwt-token-12345' };
    } else {
      throw { message: 'Invalid credentials' };
    }
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Courses API
export const getCourses = async () => {
  if (USE_MOCK) {
    await delay(300);
    return mockCourses;
  }
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/courses`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCourseById = async (id) => {
  if (USE_MOCK) {
    await delay(300);
    const course = mockCourses.find(c => c.id === parseInt(id));
    if (!course) throw { message: 'Course not found' };
    return course;
  }
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createCourse = async (courseData) => {
  if (USE_MOCK) {
    await delay(500);
    const newCourse = { ...courseData, id: nextId++ };
    mockCourses.push(newCourse);
    return newCourse;
  }
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/courses`, courseData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateCourse = async (id, courseData) => {
  if (USE_MOCK) {
    await delay(500);
    const index = mockCourses.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw { message: 'Course not found' };
    mockCourses[index] = { ...mockCourses[index], ...courseData };
    return mockCourses[index];
  }
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE_URL}/courses/${id}`, courseData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteCourse = async (id) => {
  if (USE_MOCK) {
    await delay(500);
    const index = mockCourses.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw { message: 'Course not found' };
    mockCourses.splice(index, 1);
    return { message: 'Course deleted' };
  }
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_BASE_URL}/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
