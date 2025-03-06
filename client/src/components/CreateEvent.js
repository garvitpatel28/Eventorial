import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    ticketAvailability: '',
    category: 'Music',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert date to YYYY-MM-DD format
    const formattedDate = new Date(formData.date).toISOString().split('T')[0];

    // Create a new object with the formatted date
    const payload = {
      ...formData,
      date: formattedDate,
    };

    console.log("Form Data:", payload); // Debugging

    try {
      const token = localStorage.getItem('token');
      console.log("Sending Token:", token); // Debugging

      if (!token) {
        alert("You are not authenticated. Please log in again.");
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/events/create', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Event created successfully!');
      navigate('/organizer-dashboard');
    } catch (error) {
      console.error('Error creating event:', error);
      alert(error.response?.data?.message || 'Failed to create event.');
    }
  };

  return (
    <div className="create-event">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Venue</label>
          <input type="text" name="venue" value={formData.venue} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Ticket Availability</label>
          <input type="number" name="ticketAvailability" value={formData.ticketAvailability} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange}>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Festival">Festival</option>
            <option value="Art">Art</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
