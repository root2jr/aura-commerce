import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import gsap from 'gsap';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // GSAP Animation for Menu Toggle
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        // Slide Menu Down
        gsap.to(menuRef.current, {
          y: '0%',
          duration: 0.8,
          ease: 'power4.out'
        });
        // Stagger Links Fade In
        gsap.fromTo(linksRef.current, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 }
        );
      } else {
        // Slide Menu Up
        gsap.to(menuRef.current, {
          y: '-100%',
          duration: 0.8,
          ease: 'power4.inOut'
        });
      }
    }, menuRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // Handle Navigation to specific IDs (Scroll)
  const handleNavigation = (id) => {
    setIsMenuOpen(false); // Close menu first

    // If we are not on Home, go to Home first, then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Small delay to allow page load
    } else {
      // We are on Home, just scroll
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addToRefs = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  return (
    <>
      <nav className={`navbar ${isMenuOpen ? 'menu-active' : ''}`}>
        
        {/* LOGO */}
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          AURA
        </Link>

        {/* DESKTOP LINKS (Hidden on Mobile) */}
        <div className="desktop-links">
          <button onClick={() => handleNavigation('shop')}>SHOP</button>
          <button onClick={() => handleNavigation('campaign')}>CAMPAIGN</button>
          <button onClick={() => handleNavigation('contact')}>CONTACT</button>
        </div>

        {/* ICONS */}
        <div className="nav-icons">
          <FiSearch className="icon search-icon" />
          <div className="cart-wrapper">
             <FiShoppingBag className="icon" />
             <span className="cart-count">0</span>
          </div>
          
          {/* HAMBURGER / CLOSE TOGGLE */}
          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
          </div>
        </div>
      </nav>

      {/* FULLSCREEN MOBILE/OVERLAY MENU */}
      <div className="mobile-menu-overlay" ref={menuRef}>
        <div className="mobile-links">
          <div className="mobile-link-item" ref={addToRefs}>
            <span className="index">01</span>
            <button onClick={() => handleNavigation('shop')}>SHOP COLLECTION</button>
          </div>
          <div className="mobile-link-item" ref={addToRefs}>
            <span className="index">02</span>
            <button onClick={() => handleNavigation('campaign')}>THE CAMPAIGN</button>
          </div>
          <div className="mobile-link-item" ref={addToRefs}>
            <span className="index">03</span>
            <button onClick={() => handleNavigation('footer')}>ABOUT US</button>
          </div>
          <div className="mobile-link-item" ref={addToRefs}>
            <span className="index">04</span>
            <button onClick={() => handleNavigation('contact')}>CLIENT SERVICES</button>
          </div>
        </div>

        <div className="mobile-footer">
          <span>ACHROMATIC STUDIOS © 2025</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;