import React, { useState } from 'react';
import './style.css';

export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [occasion, setOccasion] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    // Dispatch the date change to update available times
    dispatch({ type: 'UPDATE_TIMES', date: selectedDate });
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      date,
      time,
      guests,
      occasion,
    };
    
    // Call submitForm function passed from parent
    if (submitForm) {
      const success = submitForm(formData);
      if (success) {
        // Reset form on successful submission
        setDate('');
        setTime('');
        setGuests('');
        setOccasion('');
      }
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input 
        type="date" 
        id="res-date" 
        value={date}
        onChange={handleDateChange}
        required
      />
      
      <label htmlFor="res-time">Choose time</label>
      <select 
        id="res-time" 
        value={time}
        onChange={handleTimeChange}
        required
      >
        {availableTimes.map((timeOption) => (
          <option key={timeOption} value={timeOption}>
            {timeOption}
          </option>
        ))}
      </select>
      
      <label htmlFor="guests">Number of guests</label>
      <input 
        type="number" 
        placeholder="1" 
        min="1" 
        max="10" 
        id="guests" 
        value={guests}
        onChange={handleGuestsChange}
        required
      />
      
      <label htmlFor="occasion">Occasion</label>
      <select 
        id="occasion" 
        value={occasion}
        onChange={handleOccasionChange}
      >
        <option value="">Select an occasion</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      
      <input type="submit" value="Make Your reservation" className="btn-submit" />
    </form>
  );
}

