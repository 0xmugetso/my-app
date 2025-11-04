import React from 'react';
import './style.css';

const specials = [
  {
    name: 'Greek salad',
    price: '$12.99',
    description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image: `${process.env.PUBLIC_URL}/assets/greek salad.jpg`,
  },
  {
    name: 'Bruchetta',
    price: '$5.99',
    description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    image: `${process.env.PUBLIC_URL}/assets/bruchetta.svg`,
  },
  {
    name: 'Lemon Dessert',
    price: '$5.00',
    description: 'This comes straight from grandma\'s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
    image: `${process.env.PUBLIC_URL}/assets/lemon dessert.jpg`,
  },
];

export default function Main() {
  return (
    <main>
      <section className="specials-section">
        <div className="specials-header">
          <h2 className="specials-title">This weeks specials!</h2>
          <button className="btn-online-menu">Online Menu</button>
        </div>
        <div className="specials-grid">
          {specials.map((special) => (
            <article key={special.name} className="special-card">
              <div className="special-image">
                <img src={special.image} alt={special.name} />
              </div>
              <div className="special-content">
                <div className="special-header">
                  <h3 className="special-name">{special.name}</h3>
                  <span className="special-price">{special.price}</span>
                </div>
                <p className="special-description">{special.description}</p>
                <a href="/order" className="special-delivery">
                  Order a delivery <span className="delivery-icon">🚚</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}