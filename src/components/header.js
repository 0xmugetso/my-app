import React from 'react';
import './style.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Menu', href: '/menu' },
  { name: 'Reservations', href: '/reservations' },
  { name: 'Order Online', href: '/order' },
  { name: 'Login', href: '/login' },
];

export default function Header() {
  return (
    <header>
      <nav>
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/assets/Logo.svg`} alt="Little Lemon logo" />
        </div>
        <ul>
          {navigation.map((item) => (
            <li key={item.name}>
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}