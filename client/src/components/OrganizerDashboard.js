import React from 'react';
import './OrganizerDashboard.css'; // Import CSS for styling

function OrganizerDashboard() {
  return (
    <div className="organizer-dashboard">
      <h1>Organizer Dashboard</h1>
      <p>Welcome to your dashboard! Here you can manage your events.</p>
      <div className="dashboard-content">
        <div className="card">
          <h2>Create Event</h2>
          <p>Create and manage your events here.</p>
        </div>
        <div className="card">
          <h2>View Events</h2>
          <p>See all the events you've organized.</p>
        </div>
        <div className="card">
          <h2>Analytics</h2>
          <p>Track the performance of your events.</p>
        </div>
      </div>
    </div>
  );
}

export default OrganizerDashboard;