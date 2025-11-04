import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function ConfirmedBooking() {
  return (
    <main className="confirmed-booking-page">
      <section className="confirmed-booking-section">
        <div className="confirmed-booking-container">
          <div className="confirmed-booking-content">
            <h1 className="confirmed-booking-title">Booking Confirmed!</h1>
            <p className="confirmed-booking-message">
              Your reservation has been successfully confirmed. We look forward to serving you!
            </p>
            <Link to="/" className="btn-back-home">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

