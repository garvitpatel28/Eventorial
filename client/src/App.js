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
import TicketBooking from './components/TicketBooking';
import PaymentPage from './components/PaymentPage';
import CreateEvent from './components/CreateEvent';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<EventsPage />} />
       
        <Route element={<ProtectedRoute allowedUserTypes={['organizer']} />}>
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Route>
        <Route element={<ProtectedRoute allowedUserTypes={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/book-ticket/:eventId" element={<TicketBooking />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
