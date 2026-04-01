import axios from 'axios';
import { normalizeCourse, normalizeCourseCollection } from './course-helpers';
import { getStoredSession } from './storage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const session = getStoredSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

function extractErrorMessage(error) {
  const data = error?.response?.data;

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors.join(', ');
  }

  return (
    data?.message ??
    data?.error ??
    error?.message ??
    'Something went wrong while talking to the server.'
  );
}

function createApiError(error) {
  return new Error(extractErrorMessage(error));
}

export async function loginRequest(credentials) {
  try {
    const { data } = await api.post('/api/auth/login', credentials);

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      role: data.role ?? 'SUPERVISOR',
      email: credentials.email,
    };
  } catch (error) {
    throw createApiError(error);
  }
}

export async function fetchCourses() {
  try {
    const { data } = await api.get('/api/courses');
    return normalizeCourseCollection(data);
  } catch (error) {
    throw createApiError(error);
  }
}

export async function fetchCourseById(courseId) {
  try {
    const { data } = await api.get(`/api/courses/${courseId}`);
    return normalizeCourse(data?.course ?? data?.data ?? data);
  } catch (error) {
    throw createApiError(error);
  }
}

export async function createCourse(payload) {
  try {
    const { data } = await api.post('/api/courses', payload);
    return normalizeCourse(data?.course ?? data?.data ?? data);
  } catch (error) {
    throw createApiError(error);
  }
}

export async function updateCourse(courseId, payload) {
  try {
    const { data } = await api.put(`/api/courses/${courseId}`, payload);
    return normalizeCourse(data?.course ?? data?.data ?? data);
  } catch (error) {
    throw createApiError(error);
  }
}

export async function deleteCourse(courseId) {
  try {
    const { data } = await api.delete(`/api/courses/${courseId}`);
    return data;
  } catch (error) {
    throw createApiError(error);
  }
}
