import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardHolderName: '',
    cardType: 'debit',
  });

  useEffect(() => {
    if (!bookingData) {
      navigate('/');
    }
  }, [bookingData, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Payment Data Submitted:", formData);
    alert('Payment submitted successfully! Your event has been booked.');
  
    // Optionally save booking info to backend here
  
    setTimeout(() => {
      navigate('/events', { state: { bookingSuccess: true } });
    }, 1000); // slight delay to show the alert
  };
  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h2>

      {bookingData ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Card Holder Name</label>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              maxLength="16"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Expiry Month</label>
              <input
                type="text"
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
                placeholder="MM"
                maxLength="2"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Expiry Year</label>
              <input
                type="text"
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
                placeholder="YYYY"
                maxLength="4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              maxLength="4"
              placeholder="123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Card Type</label>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Payment
          </button>
        </form>
      ) : (
        <p>No booking data available. Redirecting to home...</p>
      )}
    </div>
  );
}

export default PaymentPage;
