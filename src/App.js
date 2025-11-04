import React from 'react';
import './App.css';
import Header from './components/header';
import Hero from './components/hero';
import Main from './components/main';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
