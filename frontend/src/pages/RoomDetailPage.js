import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import '../styles/pages.css';

function RoomDetailPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRoomData();
  }, [roomId]);

  const loadRoomData = async () => {
    setLoading(true);
    setError(null);
    try {
      const roomIdNumber = parseInt(roomId, 10);
      
      const [roomRes, reservRes] = await Promise.all([
        apiService.getRoom(roomIdNumber),
        apiService.getReservationsByRoom(roomIdNumber)
      ]);
      setRoom(roomRes.data);
      setReservations(reservRes.data || []);
    } catch (err) {
      setError('Failed to load room data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleDeleteReservation = async (id) => {
    if (window.confirm('Biztosan törölni szeretné ezt a foglalást?')) {
      try {
        await apiService.deleteReservation(id);
        loadRoomData();
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
        <p className="loading-text">Betöltés...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Link to="/" className="btn btn-outline">← Vissza</Link>
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/" className="btn btn-outline btn-sm">← Vissza az emeletekhez</Link>

      {room && (
        <div className="room-header">
          <div className="room-title">
            <h1>{room.roomNumber} Terem</h1>
            <div className="room-badges">
              {room.computerRoom && <span className="badge badge-info">💻 Gépterem</span>}
              {room.bigRoom && <span className="badge badge-warning">Nagyterem</span>}
            </div>
          </div>
          <div className="room-meta">
            <p><strong>Emelet:</strong> {room.floor}</p>
          </div>
          <Link to={`/room/${roomId}/new`} className="btn btn-secondary">
            + Új Foglalás
          </Link>
        </div>
      )}

      <div className="reservations-section">
        <h2>Foglalások</h2>
        {reservations.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Esemény</th>
                  <th>Tárgy</th>
                  <th>Kezdés</th>
                  <th>Vég</th>
                  <th>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.id || res.ID}>  
                    <td>{res.event}</td>
                    <td>#{res.subjectID}</td>
                    <td>{formatDateTime(res.start)}</td>
                    <td>{formatDateTime(res.end)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteReservation(res.id || res.ID)}
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
            <p>Még nincs foglalás</p>
            <Link to={`/room/${roomId}/new`} className="btn">
              Első foglalás létrehozása
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomDetailPage;