import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Marquee from './Marquee';
import ProductGrid from './ProductGrid';
import Footer from './Footer';
import Contact from './Contact';

function Home() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Marquee />
      <ProductGrid />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;