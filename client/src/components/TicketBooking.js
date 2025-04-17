import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TicketBooking.css';

function TicketBooking() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    mobileNo: '',
    numberOfTickets: 1,
    seatingPreference: 'Standard',
    eventId: '',
    userId: '' 
  });
console.log(userId)
  useEffect(() => {
   
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      setFormData(prev => ({ ...prev, userId: storedUserId }));
    } else {
    
      alert('Please log in to book tickets');
      navigate('/login');
    }

    if (eventId) {
      setFormData(prev => ({ ...prev, eventId }));
    }
  }, [eventId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to book tickets');
      navigate('/login');
      return;
    }
  
    try {
    
      const response = await fetch('http://localhost:5000/book-ticket/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: formData.userId,
          eventId: formData.eventId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          email: formData.email,
          mobileNo: formData.mobileNo,
          numberOfTickets: formData.numberOfTickets,
          seatingPreference: formData.seatingPreference,
        }),
      });
      
  
      if (response.ok) {
        navigate('/payment', { state: formData });
      } else {
        const errorData = await response.json();
        console.error('Booking failed:', errorData);
        alert(`Booking failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error occurred during booking:', error);
      alert('Something went wrong. Please try again later.');
    }
  };
    

  return (
    <div className="ticket-booking-container">
      <h2>Book Your Ticket</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex-input-group">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="text"
            name="mobileNo"
            id="mobileNo"
            placeholder="Mobile No"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-input-group">
          <div className="form-group">
            <label htmlFor="numberOfTickets">Number of Tickets</label>
            <input
              type="number"
              name="numberOfTickets"
              id="numberOfTickets"
              min="1"
              value={formData.numberOfTickets}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="seatingPreference">Seating Preference</label>
            <select
              name="seatingPreference"
              id="seatingPreference"
              value={formData.seatingPreference}
              onChange={handleChange}
            >
              <option value="Standard">Standard</option>
              <option value="VIP">VIP</option>
              <option value="Balcony">Balcony</option>
            </select>
          </div>
        </div>

        <button type="submit">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default TicketBooking;
