import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewBooking.css';

function ViewTicketBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
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
          `http://localhost:5000/api/tickets/user/${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        const data = await response.json();

        
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleViewReceipt = (booking) => {
    setSelectedBooking(booking);
    setShowReceipt(true);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    setSelectedBooking(null);
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
              <h3>{booking.eventId?.title || 'Event Name'}</h3>

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
                  className="view-receipt-btn"
                  onClick={() => handleViewReceipt(booking)}
                >
                  View Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receipt Popup Modal */}
      {showReceipt && selectedBooking && (
        <div className="receipt-modal">
          <div className="receipt-modal-content">
            <div className="receipt-header">
              <h3>Booking Receipt</h3>
              <button className="close-btn" onClick={closeReceipt}>&times;</button>
            </div>
            
            <div className="receipt-body">
              <div className="receipt-section">
                <h4>Event Details</h4>
                <p><strong>Event Name:</strong> {selectedBooking.eventId?.title}</p>
                <p><strong>Date:</strong> {new Date(selectedBooking.eventId?.date).toLocaleDateString()}</p>
                <p><strong>Venue:</strong> {selectedBooking.eventId?.venue}</p>
                <p><strong>Time:</strong> {selectedBooking.eventId?.time}</p>
              </div>
              
              <div className="receipt-section">
                <h4>Booking Details</h4>
                <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
                <p><strong>Number of Tickets:</strong> {selectedBooking.numberOfTickets}</p>
                <p><strong>Seating Preference:</strong> {selectedBooking.seatingPreference}</p>
                <p><strong>Booking Date:</strong> {new Date(selectedBooking.createdAt).toLocaleDateString()}</p>
              </div>
              
            </div>
            
            <div className="receipt-footer">
               <button className="close-btn" onClick={closeReceipt}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewTicketBooking;
