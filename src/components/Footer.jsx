import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the huge logo text
      gsap.fromTo(logoRef.current, 
        { y: -50 },
        {
          y: 0,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-section" ref={footerRef}>
      
      {/* Top Section: Links & Newsletter */}
      <div className="footer-top">
        
        <div className="footer-columns">
          <div className="f-col">
            <h4>SHOP</h4>
            <ul>
              <li><a href="#">NEW ARRIVALS</a></li>
              <li><a href="#">READY TO WEAR</a></li>
              <li><a href="#">ACCESSORIES</a></li>
              <li><a href="#">COLLECTIONS</a></li>
            </ul>
          </div>
          <div className="f-col">
            <h4>ABOUT</h4>
            <ul>
              <li><a href="#">THE HOUSE</a></li>
              <li><a href="#">SUSTAINABILITY</a></li>
              <li><a href="#">CAMPAIGNS</a></li>
              <li><a href="#">CAREERS</a></li>
            </ul>
          </div>
          <div className="f-col">
            <h4>LEGAL</h4>
            <ul>
              <li><a href="#">PRIVACY POLICY</a></li>
              <li><a href="#">TERMS OF USE</a></li>
              <li><a href="#">COOKIE SETTINGS</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>NEWSLETTER</h4>
          <p>Subscribe for exclusive access to new drops and archive sales.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="ENTER YOUR EMAIL" />
            <button><FiArrowRight /></button>
          </div>
          <div className="social-icons">
            <FiInstagram /> <FiTwitter /> <FiFacebook />
          </div>
        </div>

      </div>

      {/* Bottom Section: Massive Logo */}
      <div className="footer-bottom">
        <h1 className="footer-logo" ref={logoRef}>AURA</h1>
        <div className="footer-copy">
          <span>© 2025 AuraCommerce</span>
          <span>DESIGNED IN THE VOID</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;