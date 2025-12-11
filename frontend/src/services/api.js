import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Floors
  getFloors: () => api.get('/api/floors'),
  getRoomsByFloor: (floor) => api.get(`/api/rooms/floor/${floor}`),

  // Rooms
  getRoom: (roomId) => api.get(`/api/rooms/${roomId}`),
  getAllRooms: () => api.get('/api/rooms'),

  // Reservations
  getReservations: () => api.get('/api/reservations'),
  getReservationsByRoom: (roomId) => api.get(`/api/reservations/room/${roomId}`),
  createReservation: (reservation) => api.post('/api/reservations', reservation),
  updateReservation: (id, reservation) => api.put(`/api/reservations/${id}`, reservation),
  deleteReservation: (id) => api.delete(`/api/reservations/${id}`),
  checkAvailability: (roomId, start, end) => 
    api.get('/api/reservations/availability', {
      params: { roomId, start, end }
    }),

  // Teachers
  getTeachers: () => api.get('/api/teachers'),
  getTeacher: (id) => api.get(`/api/teachers/${id}`),
  createTeacher: (teacher) => api.post('/api/teachers', teacher),
  updateTeacher: (id, teacher) => api.put(`/api/teachers/${id}`, teacher),
  deleteTeacher: (id) => api.delete(`/api/teachers/${id}`),

  // Subjects
  getSubjects: () => api.get('/api/subjects'),
  getSubject: (id) => api.get(`/api/subjects/${id}`),
};

export default api;