import React from 'react';
import './style.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Little Lemon</h3>
          <p>Authentic Mediterranean cuisine</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <address>
            <p>123 Main Street</p>
            <p>Chicago, IL 60601</p>
            <p>Phone: (312) 555-1234</p>
            <p>Email: info@littlelemon.com</p>
          </address>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
}