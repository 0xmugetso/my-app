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
      <nav aria-label="Main navigation">
        <div className="logo-container">
          <Link to="/" aria-label="Little Lemon home page">
            <img src={`${process.env.PUBLIC_URL}/assets/Logo.svg`} alt="Little Lemon logo" />
          </Link>
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
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'} role="menubar" aria-label="Main navigation">
          {navigation.map((item) => (
            <li key={item.name} role="none">
              <Link 
                to={item.path} 
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
                aria-label={`Navigate to ${item.name} page`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}