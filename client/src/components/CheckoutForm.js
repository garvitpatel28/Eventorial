import React, { useState } from 'react';

function CheckoutForm({ bookingData }) {
  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

   
    if (name === 'cardNumber') {
      const digits = value.replace(/\s/g, '').slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }


    if (name === 'expiryMonth') {
      const month = value.slice(0, 2);
      setFormData(prev => ({ ...prev, [name]: month }));
      return;
    }

    if (name === 'expiryYear') {
      setFormData(prev => ({ ...prev, [name]: value.slice(0, 4) }));
      return;
    }


    if (name === 'cvv') {
      setFormData(prev => ({ ...prev, [name]: value.slice(0, 3) }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {
      cardHolderName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    };

    let isValid = true;

    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Name is required';
      isValid = false;
    }

    
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits) {
      newErrors.cardNumber = 'Card number is required';
      isValid = false;
    } else if (cardNumberDigits.length !== 16) {
      newErrors.cardNumber = 'Must be 16 digits';
      isValid = false;
    }

   
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const month = parseInt(formData.expiryMonth);
    const year = parseInt(formData.expiryYear);

    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Month is required';
      isValid = false;
    } else if (month < 1 || month > 12) {
      newErrors.expiryMonth = 'Invalid month';
      isValid = false;
    }

    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Year is required';
      isValid = false;
    } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
      newErrors.expiryMonth = 'Card has expired';
      isValid = false;
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
      isValid = false;
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = 'Must be 3 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
  
      console.log('Payment data submitted:', formData);
      alert('Payment Successful! 🎉');
    }

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
          className={`w-full border rounded px-3 py-2 ${errors.cardHolderName ? 'border-red-500' : ''}`}
        />
        {errors.cardHolderName && <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.cardNumber ? 'border-red-500' : ''}`}
          placeholder="4242 4242 4242 4242"
        />
        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Expiry Month</label>
          <input
            type="text"
            name="expiryMonth"
            value={formData.expiryMonth}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${errors.expiryMonth ? 'border-red-500' : ''}`}
            placeholder="MM"
          />
          {errors.expiryMonth && <p className="text-red-500 text-xs mt-1">{errors.expiryMonth}</p>}
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Expiry Year</label>
          <input
            type="text"
            name="expiryYear"
            value={formData.expiryYear}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${errors.expiryYear ? 'border-red-500' : ''}`}
            placeholder="YYYY"
          />
          {errors.expiryYear && <p className="text-red-500 text-xs mt-1">{errors.expiryYear}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">CVV</label>
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 ${errors.cvv ? 'border-red-500' : ''}`}
          placeholder="123"
        />
        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : `Pay $${bookingData?.total?.toFixed(2) || '0.00'}`}
      </button>
    </form>
  );
}

export default CheckoutForm;