import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import FloorsPage from './pages/FloorsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import CreateReservationPage from './pages/CreateReservationPage';
import TeachersPage from './pages/TeachersPage';
import ReservationsPage from './pages/ReservationsPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Campus teremfoglaló
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Emeletek</Link>
              </li>
              <li className="nav-item">
                <Link to="/reservations" className="nav-link">Foglalások</Link>
              </li>
              <li className="nav-item">
                <Link to="/teachers" className="nav-link">Tanárok</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<FloorsPage />} />
            <Route path="/room/:roomId" element={<RoomDetailPage />} />
            <Route path="/room/:roomId/new" element={<CreateReservationPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;