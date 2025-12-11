import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import '../styles/pages.css';

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getTeachers();
      setTeachers(response.data || []);
    } catch (err) {
      setError('Failed to load teachers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a teacher name');
      return;
    }

    setSubmitting(true);
    try {
      await apiService.createTeacher({ name: formData.name });
      setFormData({ name: '' });
      setShowForm(false);
      loadTeachers();
    } catch (err) {
      alert('Failed to create teacher: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this teacher?')) {
      try {
        await apiService.deleteTeacher(id);
        loadTeachers();
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="page-container loading">
        <div className="spinner"></div>
        <p className="loading-text">Loading teachers...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Tanárok</h1>
        <button className="btn btn-secondary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Mégse' : '+ Új tanár'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tanár neve</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                placeholder="Adja meg a tanár nevét"
                disabled={submitting}
              />
            </div>
            <button type="submit" className="btn btn-secondary" disabled={submitting}>
              {submitting ? 'Hozzáadás...' : 'Hozzáadás'}
            </button>
          </form>
        </div>
      )}

      {teachers.length > 0 ? (
        <div className="grid">
          {teachers.map((teacher) => (
            <div key={teacher.ID} className="card">
              <div className="card-header">
                <h3>{teacher.name}</h3>
              </div>
              <p style={{ marginBottom: '1rem' }}>ID: {teacher.ID}</p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(teacher.ID)}
              >
                Törlés
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Nincs tanár az adatbázisban</p>
        </div>
      )}
    </div>
  );
}

export default TeachersPage;