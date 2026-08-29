import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// --- Auth ---
export const loginByEmail = (email) => API.post('/auth/login', { email });
export const getDemoAccounts = () => API.get('/auth/demo-accounts');

// --- Dashboard ---
export const getHODStats = () => API.get('/dashboard/hod/stats');
export const getFacultyRoster = () => API.get('/dashboard/hod/roster');
export const getAdvisorStudents = (advisorId) => API.get(`/dashboard/advisor/${advisorId}/students`);
export const getStudentData = (studentId) => API.get(`/dashboard/student/${studentId}`);
export const submitFeedback = (payload) => API.post('/dashboard/feedback', payload);

// --- Users ---
export const getAllUsers = () => API.get('/users');
export const getFacultyProfile = (id) => API.get(`/users/${id}`);
