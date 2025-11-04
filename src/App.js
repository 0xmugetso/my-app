import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './components/homePage';
import BookingPage from './components/bookingPage';
import ConfirmedBooking from './components/confirmedBooking';
import { initializeTimes, updateTimes } from './utils/bookingReducer';

// Component wrapper to pass navigate function to BookingPage
function BookingPageWrapper({ availableTimes, dispatch }) {
  const navigate = useNavigate();

  const submitForm = (formData) => {
    // Use submitAPI if available
    if (typeof window !== 'undefined' && window.submitAPI) {
      const success = window.submitAPI(formData);
      if (success) {
        navigate('/booking-confirmed');
        return true;
      } else {
        alert('Failed to submit reservation. Please try again.');
        return false;
      }
    } else {
      // Fallback if API is not available - navigate anyway for testing
      console.log('Form submitted:', formData);
      navigate('/booking-confirmed');
      return true;
    }
  };

  return (
    <BookingPage 
      availableTimes={availableTimes} 
      dispatch={dispatch} 
      submitForm={submitForm}
    />
  );
}

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, null, initializeTimes);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/reservations" 
            element={<BookingPageWrapper availableTimes={availableTimes} dispatch={dispatch} />} 
          />
          <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/menu" element={<HomePage />} />
          <Route path="/order" element={<HomePage />} />
          <Route path="/login" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
