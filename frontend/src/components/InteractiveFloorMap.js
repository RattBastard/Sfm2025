import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InteractiveFloorMap.css';

const InteractiveFloorMap = ({ floor, rooms }) => {
  const navigate = useNavigate();
  const [hoveredRoom, setHoveredRoom] = useState(null);

  // FÖLDSZINT (Emelet = 0) - Termek: 1, 2, 3, 4, 5, 6, 8, 9
  const groundFloorRoomPositions = {
    1: { left: '10.5%', top: '34.5%', width: '21.5%', height: '15.5%' },
    2: { left: '6%', top: '13%', width: '8%', height: '14%' },
    3: { left: '14%', top: '13%', width: '7%', height: '14%' },
    4: { left: '21.5%', top: '13%', width: '7.5%', height: '14%' },
    5: { left: '29%', top: '13%', width: '7.5%', height: '14%' },
    0: { left: '55%', top: '45%', width: '20%', height: '20%'},
    8: { left: '22.5%', top: '76%', width: '6.5%', height: '13%' },
    9: { left: '29%', top: '76%', width: '6.5%', height: '13%' },
  };

  // 1. EMELET (Emelet = 1) - Termek: 102, 103, 104, 105, 106, 107, 132
  const firstFloorRoomPositions = {
    102: { left: '6.5%', top: '13%', width: '9.5%', height: '14%' },
    103: { left: '16.5%', top: '13%', width: '9.5%', height: '14%' },
    104: { left: '26.5%', top: '13%', width: '9.5%', height: '14%' },
    107: { left: '19%', top: '76%', width: '8%', height: '13%' },
    106: { left: '10.5%', top: '76%', width: '8%', height: '13%' },      // Gépterem
    101: { left: '10.5%', top: '34.5%', width: '21.5%', height: '15.5%' }, // Gépterem
    105: { left: '2%', top: '76%', width: '8%', height: '13%' },    // Kis terem
    108: { left: '27.5%', top: '76%', width: '8%', height: '13%' }, // Nagyterem
  };

  // 2. EMELET (Emelet = 2) - Termek: 201, 202, 203, 204, 205, 206, 207
  const secondFloorRoomPositions = {
    204: { left: '6%', top: '13%', width: '10%', height: '14%' },    // Nagyterem
    202: { left: '16%', top: '13%', width: '10%', height: '14%' },
    203: { left: '26%', top: '13%', width: '10%', height: '14%' },
    201: { left: '10.5%', top: '34.5%', width: '21.75%', height: '15.5%' },
    205: { left: '2%', top: '76%', width: '10%', height: '13%' },
    206: { left: '12%', top: '76%', width: '10%', height: '13%' },
    207: { left: '22%', top: '76%', width: '13.5%', height: '13%' },
  };

  // 3. EMELET (Emelet = 3) - Termek: 310, 311, 312, 320, 321, 322, 323, 324
  const thirdFloorRoomPositions = {
    // Gépterem csoport (310-312)
    310: { left: '54.5%', top: '12%', width: '14%', height: '11.5%' },    // Gépterem
    311: { left: '68.5%', top: '12%', width: '14%', height: '11.5%' }, // Gépterem
    312: { left: '82.5%', top: '12%', width: '13%', height: '11.5%' },    // Gépterem
    
    // Kis termek (320-324)
    320: { left: '53%', top: '71%', width: '8%', height: '12.5%' },
    321: { left: '61%', top: '71%', width: '8%', height: '12.5%' },
    322: { left: '69%', top: '71%', width: '8%', height: '12.5%' },
    323: { left: '77%', top: '71%', width: '8%', height: '12.5%' },
    324: { left: '85%', top: '71%', width: '8.5%', height: '12.5%' },
  };

  const getRoomPositions = () => {
    switch(floor) {
      case 0: return groundFloorRoomPositions;
      case 1: return firstFloorRoomPositions;
      case 2: return secondFloorRoomPositions;
      case 3: return thirdFloorRoomPositions;
      default: return groundFloorRoomPositions;
    }
  };

  const getFloorImage = () => {
    switch(floor) {
      case 0: return '/images/ground-floor.png';
      case 1: return '/images/first-floor.png';
      case 2: return '/images/second-floor.png';
      case 3: return '/images/third-floor.png';
      default: return '/images/ground-floor.png';
    }
  };

  const roomPositions = getRoomPositions();
  const floorImage = getFloorImage();

  const handleRoomClick = (room) => {
    navigate(`/room/${room.roomID}`);
  };

  return (
    <div className="interactive-map-wrapper">
      <div className="floor-plan-container">
        <img 
          src={floorImage} 
          alt={`Floor ${floor} plan`} 
          className="floor-plan-image"
        />
        
        <div className="room-overlays">
          {rooms.map((room) => {
            const position = roomPositions[room.roomNumber];
            
            if (!position) return null;

            return (
              <div
                key={room.roomID}
                className={`room-overlay ${hoveredRoom === room.roomID ? 'hovered' : ''}`}
                style={{
                  left: position.left,
                  top: position.top,
                  width: position.width,
                  height: position.height,
                  transform: position.transform || 'none',
                }}
                onClick={() => handleRoomClick(room)}
                onMouseEnter={() => setHoveredRoom(room.roomID)}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                <div className="room-overlay-content">
                  <div className="room-overlay-number">{room.roomNumber}</div>
                  {hoveredRoom === room.roomID && (
                    <div className="room-overlay-info">
                      <div className="room-overlay-icons">
                        {room.computerRoom && <span title="Gépterem">💻</span>}
                      </div>
                      <div className="room-overlay-action">Kattints a foglaláshoz →</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {hoveredRoom && (
        <div className="room-info-tooltip">
          {rooms.find(r => r.roomID === hoveredRoom)?.roomNumber} Terem
        </div>
      )}
    </div>
  );
};

export default InteractiveFloorMap;