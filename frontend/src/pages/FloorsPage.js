import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import InteractiveFloorMap from '../components/InteractiveFloorMap';
import '../styles/pages.css';

function FloorsPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'

  const floors = [
    { id: 0, name: 'Földszint', label: 'Ground Floor' },
    { id: 1, name: '1. emelet', label: '1st Floor' },
    { id: 2, name: '2. emelet', label: '2nd Floor' },
    { id: 3, name: '3. emelet', label: '3rd Floor' },
  ];

  useEffect(() => {
    loadRoomsByFloor(selectedFloor);
  }, [selectedFloor]);

  const loadRoomsByFloor = async (floorId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getRoomsByFloor(floorId);
      setRooms(response.data || []);
    } catch (err) {
      setError('Termek betöltése sikertelen: ' + err.message);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  // Filter out excluded rooms
  const getFilteredRooms = () => {
    return rooms.filter(room => {
      const roomNum = room.roomNumber;
      // Exclude i330-i332 range
      if (roomNum >= 330 && roomNum <= 332 && selectedFloor === 3) {
        return false;
      }
      return true;
    });
  };

  const filteredRooms = getFilteredRooms();

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Épület térképe</h1>
          <p className="subtitle">Válasszon emeletet és termet a foglaláshoz</p>
        </div>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            Térkép
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            Lista
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p className="loading-text">Termek betöltése...</p>
        </div>
      ) : (
        <div className="floor-content">
          {viewMode === 'map' ? (
            <div className="map-view">
              <h2>Interaktív alaprajz - {floors[selectedFloor].name}</h2>
              <p className="map-instruction">Kattintson egy teremre a foglaláshoz</p>
              
              {/* Map and Floor Selector Side by Side */}
              <div className="map-and-floors-container">
                <div style={{ flex: 1 }}>
                  <InteractiveFloorMap 
                    floor={selectedFloor} 
                    rooms={filteredRooms} 
                  />
                </div>
                
                {/* Floor Selector on Right */}
                <div className="floor-selector">
                  {floors.map((floor) => (
                    <button
                      key={floor.id}
                      className={`floor-tab ${selectedFloor === floor.id ? 'active' : ''}`}
                      onClick={() => setSelectedFloor(floor.id)}
                    >
                      <div className="floor-tab-name">{floor.name}</div>
                      <div className="floor-tab-label">{floor.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Room list below map */}
              <div className="rooms-list-compact">
                <h3>Elérhető termek ezen az emeleten</h3>
                <div className="compact-room-grid">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.roomID}
                      className="compact-room-item"
                      onClick={() => handleRoomClick(room.roomID)}
                    >
                      <span className="compact-room-number">{room.roomNumber}</span>
                      {room.computerRoom && <span className="compact-icon">💻</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rooms-list-view">
              <h2>Termek - {floors[selectedFloor].name}</h2>
              {filteredRooms.length > 0 ? (
                <div className="grid">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.roomID}
                      className="card room-card"
                      onClick={() => handleRoomClick(room.roomID)}
                    >
                      <div className="card-header">
                        <h3>{room.roomNumber} Terem</h3>
                      </div>
                      <div className="room-details">
                        {room.computerRoom && <span className="badge">💻 Gépterem</span>}
                        {room.bigRoom && <span className="badge">Nagyterem</span>}
                      </div>
                      <div className="room-action">Részletek →</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Nincs elérhető terem ezen az emeleten.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FloorsPage;