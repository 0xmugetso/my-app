import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-text">
          <h1 id="hero-title" className="hero-title">Little Lemon</h1>
          <h2 className="hero-subtitle">Chicago</h2>
          <p className="hero-description">
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          <Link 
            to="/reservations" 
            className="btn-reserve"
            aria-label="Reserve a table at Little Lemon restaurant"
          >
            Reserve a Table
          </Link>
        </div>
        <div className="hero-image">
          <img src={`${process.env.PUBLIC_URL}/assets/restauranfood.jpg`} alt="Chef serving Mediterranean food" />
        </div>
      </div>
    </section>
  );
}

