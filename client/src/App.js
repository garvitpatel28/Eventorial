import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import EventsPage from './components/EventsPage';
import OrganizerDashboard from './components/OrganizerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedUserTypes={['user', 'organizer']} />}>
          <Route path="/events" element={<EventsPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedUserTypes={['organizer']} />}>
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedUserTypes={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;