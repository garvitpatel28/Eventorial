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
    numberOfTickets: 1,
    seatingPreference: 'Standard',
    eventId: '',
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, eventId })); // Update eventId when available
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData); // Debugging to ensure form data is correct

    try {
      const response = await fetch('http://localhost:5000/book-ticket/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log("Server response:", response); // Debugging the server response

      if (response.ok) {
        console.log('Ticket booked successfully'); // Debugging success message
        // Navigate to payment page
        navigate('/payment', { state: formData });
      } else {
        const errorData = await response.json();
        console.error('Error booking ticket:', errorData); // Error handling if booking fails
      }
    } catch (error) {
      console.error('Request failed:', error); // Error handling if request fails
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Book Your Ticket</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="w-1/2 p-2 border rounded" />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="w-1/2 p-2 border rounded" />
        </div>
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="mobileNo" placeholder="Mobile No" onChange={handleChange} required className="w-full p-2 border rounded" />
        <div className="flex gap-4">
          <input type="number" name="numberOfTickets" min="1" placeholder="Tickets" onChange={handleChange} required className="w-1/2 p-2 border rounded" />
          <select name="seatingPreference" onChange={handleChange} className="w-1/2 p-2 border rounded">
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
            <option value="Balcony">Balcony</option>
          </select>
        </div>
        <button 
          type="submit" // Submit button triggers form submission
          className="w-full p-2 rounded text-white bg-blue-600 hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default TicketBooking;
