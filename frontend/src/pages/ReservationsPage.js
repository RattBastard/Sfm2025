import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import '../styles/pages.css';

function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getReservations();
      setReservations(response.data || []);
      
      // Töltsd be az összes termet is, hogy megjelenítsd a számokat
      const roomsResponse = await apiService.getAllRooms();
      const roomsMap = {};
      roomsResponse.data.forEach(room => {
        roomsMap[room.roomID] = room;
      });
      setRooms(roomsMap);
    } catch (err) {
      setError('Failed to load reservations: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert('Hiba: A foglalásnak nincs ID-ja!');
      return;
    }
    
    if (window.confirm('Biztosan törölni szeretné ezt a foglalást?')) {
      try {
        await apiService.deleteReservation(id);
        loadReservations();
      } catch (err) {
        let errorMessage = 'Törlés sikertelen!';
        
        if (err.response && err.response.data) {
          if (typeof err.response.data === 'string') {
            errorMessage = err.response.data;
          } else if (err.response.data.message) {
            errorMessage = err.response.data.message;
          }
        } else if (err.message) {
          errorMessage = 'Hiba: ' + err.message;
        }
        
        alert(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <div className="page-container loading">
        <div className="spinner"></div>
        <p className="loading-text">Foglalások betöltése...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Foglalások</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {reservations.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Terem</th>
                <th>Esemény</th>
                <th>Tárgy</th>
                <th>Kezdés</th>
                <th>Vég</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id || res.ID || res.reservationId}>
                  <td>
                    {rooms[res.roomID] ? rooms[res.roomID].roomNumber : res.roomID} Terem
                  </td>
                  <td>{res.event}</td>
                  <td>#{res.subjectID}</td>
                  <td>{formatDateTime(res.start)}</td>
                  <td>{formatDateTime(res.end)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(res.id || res.ID || res.reservationId)}
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <p>Nincs foglalás</p>
        </div>
      )}
    </div>
  );
}

export default ReservationsPage;