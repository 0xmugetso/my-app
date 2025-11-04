import React from 'react';
import BookingForm from './bookingForm';
import './style.css';

export default function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <main className="booking-page">
      <section className="booking-section">
        <div className="booking-container">
          <h1 className="booking-title">Reserve a Table</h1>
          <BookingForm 
            availableTimes={availableTimes} 
            dispatch={dispatch} 
            submitForm={submitForm}
          />
        </div>
      </section>
    </main>
  );
}

