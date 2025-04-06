import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not logged in');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch bookings from the API
    axios.get(`http://localhost:5000/api/bookings/user/${userId}`, { headers : {Authorization: `Bearer ${token}`,}})
    .then(response => {
      setBookings(response.data);
    })
    .catch(err => {
      setError('Error fetching bookings');
      console.error('Error fetching bookings:', err);
    });
  
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking._id}>
              Event: {booking.event.title}, Date: {booking.event.date}, Venue: {booking.event.venue}
            </li>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </ul>
    </div>
  );
}

export default ViewBookings;
