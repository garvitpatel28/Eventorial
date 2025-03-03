import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TicketBooking() {
  const { eventId } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    mobileNo: '',
    eventId: '',
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, eventId })); // Update eventId when available
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData); // Debugging
  
    try {
      const response = await fetch('http://localhost:5000/book-ticket/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      console.log("Server response:", response);
  
      if (response.ok) {
        console.log('Ticket booked successfully');
        navigate('/payment');
      } else {
        const errorData = await response.json();
        console.error('Error booking ticket:', errorData);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };


  return (
    <div>
      <h2>Book Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="mobileNo" placeholder="Mobile No" onChange={handleChange} required />
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default TicketBooking;
