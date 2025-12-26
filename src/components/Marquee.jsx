import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import './Marquee.css';

const Marquee = () => {
  const marqueeRef = useRef(null);

  useLayoutEffect(() => {
    const el = marqueeRef.current;
    
    // Infinite horizontal scroll
    gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });
  }, []);

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track" ref={marqueeRef}>
        <span>FREE GLOBAL SHIPPING — NEW ARRIVALS LANDING — </span>
        <span>FREE GLOBAL SHIPPING — NEW ARRIVALS LANDING — </span>
        <span>FREE GLOBAL SHIPPING — NEW ARRIVALS LANDING — </span>
        <span>FREE GLOBAL SHIPPING — NEW ARRIVALS LANDING — </span>
      </div>
    </div>
  );
};

export default Marquee;