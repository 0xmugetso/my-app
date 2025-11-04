import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Menu', path: '/menu' },
  { name: 'Reservations', path: '/reservations' },
  { name: 'Order Online', path: '/order' },
  { name: 'Login', path: '/login' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav>
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/assets/Logo.svg`} alt="Little Lemon logo" />
        </div>
        <button 
          className="hamburger-menu"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <img 
            src={`${process.env.PUBLIC_URL}/assets/🦆 icon _hamburger menu.svg`} 
            alt="Menu" 
          />
        </button>
        {isMenuOpen && (
          <div 
            className="menu-overlay" 
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {navigation.map((item) => (
            <li key={item.name}>
              <Link to={item.path} onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}