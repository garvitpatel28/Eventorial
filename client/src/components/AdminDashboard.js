import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import axios from 'axios';

function AdminDashboard() {
  const [view, setView] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "User",
  });

  useEffect(() => {
    if (view === "users") {
      fetchUsers();
    } else if (view === "events") {
      fetchAllEvents();
    }
  }, [view]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to load users.");
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events/all");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to load events.");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
      alert("Event deleted successfully.");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setUsers([...users, response.data]);
      alert("User added successfully!");
      setShowModal(false);
      setFormData({ name: "", email: "", password: "", userType: "User" });
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setUsers(users.filter(user => user._id !== id));
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage all platform activities here.</p>

      {view === "users" ? (
        <div className="user-grid">
          <h2>Manage Users</h2>
          <button className="admin-button secondary back-button" onClick={() => setView("dashboard")}>
            Back to Dashboard
          </button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.userType}</td>
                  <td>
                    <button className="admin-button danger" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : view === "events" ? (
        <div className="user-grid">
          <h2>All Events</h2>
          <button className="admin-button secondary back-button" onClick={() => setView("dashboard")}>
            Back to Dashboard
          </button>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Organizer Name</th>
                <th>Organizer Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.venue}</td>
                  <td>{event.organizer?.name || "N/A"}</td>
                  <td>{event.organizer?.email || "N/A"}</td>
                  <td>
                    <button className="admin-button danger" onClick={() => handleDeleteEvent(event._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="dashboard-content">
          <div className="admin-card manage-users">
            <h2>Manage Users</h2>
            <p>View, edit, and manage all user accounts and permissions.</p>
            <div className="admin-actions">
              <button className="admin-button primary" onClick={() => setView("users")}>
                View Users
              </button>
              <button className="admin-button secondary" onClick={() => setShowModal(true)}>
                Add User
              </button>
            </div>
          </div>

          <div className="admin-card event-approvals">
            <h2>Event Approvals</h2>
            <p>Review and approve pending event submissions.</p>
            <div className="admin-actions">
              <button
                className="admin-button primary"
                onClick={() => setView("events")}
              >
                Review Events
              </button>
            </div>
          </div>

          <div className="admin-card system-settings">
            <h2>User Bookings</h2>
            <p>Configure events bookings of users.</p>
            <div className="admin-actions">
              <button className="admin-button primary">View Bookings</button>
            </div>
          </div>

        </div>
      )}

      {/* Add User Modal */}
      {showModal && (
        <div className={`modal fade ${showModal ? "show d-block" : ""}`} id="addUserModal" tabIndex="-1" aria-hidden={!showModal}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">User Name</label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">User Type</label>
                  <select name="userType" className="form-select" value={formData.userType} onChange={handleInputChange}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="organizer">Organizer</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddUser}>
                  Save User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
