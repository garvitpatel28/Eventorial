import React from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage all platform activities here.</p>
      
      <div className="dashboard-content">
        <div className="admin-card manage-users">
          <h2>Manage Users</h2>
          <p>View, edit, and manage all user accounts and permissions.</p>
          <div className="admin-actions">
            <button className="admin-button primary">View Users</button>
            <button className="admin-button secondary">Add User</button>
          </div>
        </div>

        <div className="admin-card system-settings">
          <h2>System Settings</h2>
          <p>Configure platform-wide settings and preferences.</p>
          <div className="admin-actions">
            <button className="admin-button primary">Configure</button>
          </div>
        </div>

        <div className="admin-card event-approvals">
          <h2>Event Approvals</h2>
          <p>Review and approve pending event submissions.</p>
          <div className="admin-actions">
            <button className="admin-button primary">Review Events</button>
          </div>
        </div>

        <div className="admin-card analytics">
          <h2>Platform Analytics</h2>
          <p>Access detailed statistics and usage reports.</p>
          <div className="admin-actions">
            <button className="admin-button primary">View Analytics</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;