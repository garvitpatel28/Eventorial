import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TicketBooking() {
  const { eventId } = useParams(); // Grab the event ID from the route
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
    if (eventId) {
      setFormData((prev) => ({ ...prev, eventId }));
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/book-ticket/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/payment', { state: formData });
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Book Your Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="mobileNo"
          placeholder="Mobile No"
          value={formData.mobileNo}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-4">
          <input
            type="number"
            name="numberOfTickets"
            min="1"
            value={formData.numberOfTickets}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded"
          />
          <select
            name="seatingPreference"
            value={formData.seatingPreference}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
          >
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
            <option value="Balcony">Balcony</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 rounded text-white bg-blue-600 hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default TicketBooking;
