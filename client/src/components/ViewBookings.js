// ViewBookings.js (Corrected)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewBooking.css';

function ViewTicketBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        if (!userId || !token) {
          navigate('/login');
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/tickets/user/${userId}`, // Correct endpoint
          {
            headers: {
              'Authorization': `Bearer ${token}` // Add auth header
            }
          }
        );
       console.log(response)
      
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:5000/tickets/${bookingId}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) throw new Error('Failed to cancel booking');
        
        setBookings(bookings.filter(booking => booking._id !== bookingId));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading your bookings...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="view-ticket-booking-container">
      <h2>My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet.</p>
          <button onClick={() => navigate('/events')}>Browse Events</button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.eventId?.name || 'Event Name'}</h3>
                <span className="booking-status">Confirmed</span>
              </div>
              
              <div className="booking-details">
                <div className="detail-item">
                  <span>Date:</span>
                  <span>{new Date(booking.eventId?.date).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span>Venue:</span>
                  <span>{booking.eventId?.venue || 'Venue information'}</span>
                </div>
                <div className="detail-item">
                  <span>Tickets:</span>
                  <span>{booking.numberOfTickets}</span>
                </div>
                <div className="detail-item">
                  <span>Seating:</span>
                  <span>{booking.seatingPreference}</span>
                </div>
              </div>
              
              <div className="booking-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
                <button 
                  className="view-receipt-btn"
                  onClick={() => navigate(`/booking-receipt/${booking._id}`)}
                >
                  View Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewTicketBooking;