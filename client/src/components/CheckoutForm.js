import React, { useState } from 'react';

function CheckoutForm({ bookingData }) {
  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardType: 'debit',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Fake validation logic
    if (
      !formData.cardHolderName ||
      !formData.cardNumber ||
      !formData.expiryMonth ||
      !formData.expiryYear ||
      !formData.cvv
    ) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    console.log('Payment data submitted:', formData);
    alert('Payment Successful! 🎉');
    setLoading(false);
  };

  return (
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

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

export default CheckoutForm;
