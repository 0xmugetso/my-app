import React, { useState, useEffect } from 'react';
import './style.css';

export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [occasion, setOccasion] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split('T')[0];

  // Validate form fields
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'date':
        if (!value) {
          newErrors.date = 'Date is required';
        } else {
          const selectedDate = new Date(value);
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          if (selectedDate < todayDate) {
            newErrors.date = 'Date cannot be in the past';
          } else {
            delete newErrors.date;
          }
        }
        break;

      case 'time':
        if (!value) {
          newErrors.time = 'Time is required';
        } else {
          delete newErrors.time;
        }
        break;

      case 'guests':
        if (!value) {
          newErrors.guests = 'Number of guests is required';
        } else {
          const numGuests = parseInt(value, 10);
          if (isNaN(numGuests) || numGuests < 1) {
            newErrors.guests = 'Must be at least 1 guest';
          } else if (numGuests > 10) {
            newErrors.guests = 'Maximum 10 guests allowed';
          } else {
            delete newErrors.guests;
          }
        }
        break;

      case 'occasion':
        // Occasion is optional, so no validation needed
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid
  useEffect(() => {
    const isValid = 
      date && 
      time && 
      guests && 
      parseInt(guests, 10) >= 1 && 
      parseInt(guests, 10) <= 10 &&
      Object.keys(errors).length === 0;
    
    setIsFormValid(isValid);
  }, [date, time, guests, errors]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    validateField('date', selectedDate);
    // Dispatch the date change to update available times
    dispatch({ type: 'UPDATE_TIMES', date: selectedDate });
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    setTime(selectedTime);
    validateField('time', selectedTime);
  };

  const handleGuestsChange = (e) => {
    const numGuests = e.target.value;
    setGuests(numGuests);
    validateField('guests', numGuests);
  };

  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const isDateValid = validateField('date', date);
    const isTimeValid = validateField('time', time);
    const isGuestsValid = validateField('guests', guests);

    if (!isDateValid || !isTimeValid || !isGuestsValid) {
      return;
    }
    
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
        setErrors({});
      }
    }
  };

  return (
    <form 
      className="booking-form" 
      onSubmit={handleSubmit} 
      noValidate
      aria-label="Reservation form"
    >
      <div className="form-field">
        <label htmlFor="res-date">Choose date</label>
        <input 
          type="date" 
          id="res-date" 
          name="date"
          value={date}
          onChange={handleDateChange}
          onBlur={handleBlur}
          min={today}
          required
          aria-invalid={errors.date ? 'true' : 'false'}
          aria-describedby={errors.date ? 'date-error' : undefined}
        />
        {errors.date && (
          <span className="error-message" id="date-error" role="alert">
            {errors.date}
          </span>
        )}
      </div>
      
      <div className="form-field">
        <label htmlFor="res-time">Choose time</label>
        <select 
          id="res-time" 
          name="time"
          value={time}
          onChange={handleTimeChange}
          onBlur={handleBlur}
          required
          aria-invalid={errors.time ? 'true' : 'false'}
          aria-describedby={errors.time ? 'time-error' : undefined}
        >
          <option value="">Select a time</option>
          {availableTimes.map((timeOption) => (
            <option key={timeOption} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </select>
        {errors.time && (
          <span className="error-message" id="time-error" role="alert">
            {errors.time}
          </span>
        )}
      </div>
      
      <div className="form-field">
        <label htmlFor="guests">Number of guests</label>
        <input 
          type="number" 
          placeholder="1" 
          min="1" 
          max="10" 
          id="guests" 
          name="guests"
          value={guests}
          onChange={handleGuestsChange}
          onBlur={handleBlur}
          required
          aria-invalid={errors.guests ? 'true' : 'false'}
          aria-describedby={errors.guests ? 'guests-error' : undefined}
        />
        {errors.guests && (
          <span className="error-message" id="guests-error" role="alert">
            {errors.guests}
          </span>
        )}
      </div>
      
      <div className="form-field">
        <label htmlFor="occasion">Occasion</label>
        <select 
          id="occasion" 
          name="occasion"
          value={occasion}
          onChange={handleOccasionChange}
        >
          <option value="">Select an occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
      </div>
      
      <input 
        type="submit" 
        value="Make Your reservation" 
        className="btn-submit"
        disabled={!isFormValid}
        aria-disabled={!isFormValid}
        aria-label="Submit reservation form"
      />
    </form>
  );
}

