import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/pages.css';

function CreateReservationPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    teacherId: '',
    subjectEvent: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const [roomRes, teachersRes] = await Promise.all([
        apiService.getRoom(roomId),
        apiService.getTeachers().catch(() => ({ data: [] }))
      ]);
      setRoom(roomRes.data);
      setTeachers(teachersRes.data || []);
      
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        startDate: today,
        endDate: today,
      }));
    } catch (err) {
      setError('Failed to load data: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.teacherId || !formData.subjectEvent || !formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
      setError('Kérem töltse ki az összes mezőt!');
      return;
    }

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    if (startDateTime >= endDateTime) {
      setError('A vége időpontnak későbbinek kell lennie, mint a kezdés!');
      return;
    }

    setSubmitting(true);
    try {
      const formatLocalDateTime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      };

      await apiService.createReservation({
        roomID: roomId,
        event: formData.subjectEvent,
        subjectID: parseInt(formData.teacherId),
        start: formatLocalDateTime(startDateTime),  // ← Helyi idő, NEM UTC!
        end: formatLocalDateTime(endDateTime),      // ← Helyi idő, NEM UTC!
      });

      setSuccess(true);
      setTimeout(() => {
        navigate(`/room/${roomId}`);
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
          setError(err.response.data);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Foglalás létrehozása sikertelen!');
        }
      } else if (err.message) {
        setError('Hiba: ' + err.message);
      } else {
        setError('Ismeretlen hiba történt a foglalás során.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container loading">
        <div className="spinner"></div>
        <p className="loading-text">Betöltés...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to={`/room/${roomId}`} className="btn btn-outline btn-sm">← Vissza</Link>

      {room && (
        <div className="reservation-header">
          <h1>{room.roomNumber} Terem</h1>
          <p className="room-subtitle">
            {room.bigRoom ? 'Nagy Előadó' : 'Terem'} 
            {room.computerRoom && ' - Gépterem'}
          </p>
        </div>
      )}

      <div className="reservation-form-container">
        <h2>Foglalás</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">Foglalás sikeres! Átirányítás...</div>}

        <form onSubmit={handleSubmit} className="reservation-form">
          {/* Teacher Selection */}
          <div className="form-group">
            <label htmlFor="teacherId">
              Tanár:
              <span className="dropdown-icon">⬇️</span>
            </label>
            <select
              id="teacherId"
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              required
              disabled={submitting}
              className="teacher-dropdown"
            >
              <option value="">Válasszon tanárt...</option>
              {teachers.map((teacher) => (
                <option key={teacher.ID} value={teacher.ID}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject/Event */}
          <div className="form-group">
            <label htmlFor="subjectEvent">Tárgy/Esemény:</label>
            <input
              type="text"
              id="subjectEvent"
              name="subjectEvent"
              value={formData.subjectEvent}
              onChange={handleChange}
              placeholder="pl: Adatbázisok"
              required
              disabled={submitting}
            />
          </div>

          {/* Start DateTime */}
          <div className="datetime-group">
            <div className="form-group">
              <label htmlFor="startDate">Kezdete:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                disabled={submitting}
                className="datetime-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="startTime">&nbsp;</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                disabled={submitting}
                className="datetime-input"
              />
            </div>
          </div>

          {/* End DateTime */}
          <div className="datetime-group">
            <div className="form-group">
              <label htmlFor="endDate">Vége:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                disabled={submitting}
                className="datetime-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="endTime">&nbsp;</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                disabled={submitting}
                className="datetime-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-secondary btn-ready" disabled={submitting}>
              {submitting ? 'Foglalás...' : 'Kész'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReservationPage;