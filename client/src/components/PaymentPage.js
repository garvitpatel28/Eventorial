import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Your Stripe public key
const stripePromise = loadStripe("pk_test_51R9qNpEPAlxVwFvpuSntWtm4LsnY0A2on1T84SxfoFvgQbmNMNDWR2eLuozyYBmP0gSDHb37yqzH2YBt5TIcq8QQ0050RXITYn");

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  useEffect(() => {
    if (!bookingData) {
      // Redirect to home if no booking data exists
      navigate('/');
    }
  }, [bookingData, navigate]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Complete Your Payment</h2>

      {bookingData ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm bookingData={bookingData} />
        </Elements>
      ) : (
        <p>No booking data available. Redirecting to home...</p>
      )}
    </div>
  );
}

export default PaymentPage;
