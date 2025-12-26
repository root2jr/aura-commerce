import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text Reveal
      gsap.from(".hero-title-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });

      // Image Reveal
      gsap.from(imgRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.5
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-content">
        <h1 className="hero-title">
          <div className="overflow-hidden"><span className="hero-title-line">THE SILHOUETTE</span></div>
          <div className="overflow-hidden"><span className="hero-title-line">ISSUE</span></div>
        </h1>
        
        <div className="hero-sub">
          <p>Autumn/Winter '25 Collection. Exploring form and void.</p>
          <button className="explore-btn">
            EXPLORE CAMPAIGN <FiArrowRight />
          </button>
        </div>
      </div>

      <div className="hero-image-container">
        {/* Placeholder for high-fashion avant-garde image */}
        <img 
          ref={imgRef}
          src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop" 
          alt="Avant-Garde Fashion" 
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;