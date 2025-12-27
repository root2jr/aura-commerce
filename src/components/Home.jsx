import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Marquee from './Marquee';
import ProductGrid from './ProductGrid';
import Footer from './Footer';
import Contact from './Contact';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const router = useNavigate()
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt){
      router("/");
    }
    scrollTo(0,0);
   
  },[])
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