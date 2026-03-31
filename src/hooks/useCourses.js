import { useState, useEffect } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse, getCourseById } from '../services/api';
import toast from 'react-hot-toast';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (courseData) => {
    try {
      const newCourse = await createCourse(courseData);
      setCourses(prev => [...prev, newCourse]);
      toast.success('Course created successfully');
      return newCourse;
    } catch (err) {
      toast.error('Failed to create course');
      throw err;
    }
  };

  const editCourse = async (id, courseData) => {
    try {
      const updatedCourse = await updateCourse(id, courseData);
      setCourses(prev => prev.map(course => course.id === id ? updatedCourse : course));
      toast.success('Course updated successfully');
      return updatedCourse;
    } catch (err) {
      toast.error('Failed to update course');
      throw err;
    }
  };

  const removeCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCourses(prev => prev.filter(course => course.id !== id));
      toast.success('Course deleted successfully');
    } catch (err) {
      toast.error('Failed to delete course');
      throw err;
    }
  };

  const getCourse = async (id) => {
    try {
      return await getCourseById(id);
    } catch (err) {
      toast.error('Failed to fetch course');
      throw err;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    addCourse,
    editCourse,
    removeCourse,
    getCourse
  };
};
