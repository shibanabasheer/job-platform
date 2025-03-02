import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import CompanyDashboard from './components/CompanyDashboard';
import './App.css'; // Import your CSS file

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/company">Company Dashboard</Link></li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
