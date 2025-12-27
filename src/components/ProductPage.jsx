import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiPlus, FiMinus, FiHeart, FiShare2, FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi';
import { useLocation, useParams } from 'react-router-dom';
import './ProductPage.css';
import Contact from './Contact';
import Footer from './Footer';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const ProductPage = () => {
  const location = useLocation();

  // 1. Initialize state with location data or null
  const [productData, setProductData] = useState(location.state?.product || null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(location.state?.object?.colors?.[0] || null);
  const [qty, setQty] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { id } = useParams();
  const pageRef = useRef(null);
  const galleryRef = useRef(null);
  const infoRef = useRef(null);

  // 2. Sync state if location changes (e.g., navigating between products)
  useEffect(() => {
    const fetch_Data = async () => {
      try {
        const response = await axios.post("https://aura-commerce-znkm.onrender.com/item", {
          id: id
        });
        setProductData(response.data.product);
        setSelectedColor(response.data.product.colors?.[0] || null);
        setSelectedSize(null); // Reset size on product change
        setQty(1);
      } catch (error) {
        console.error("Error:", e);
      }
    }
    if (location.state?.object) {
      const newProduct = location.state.object;
      setProductData(newProduct);
      setSelectedColor(newProduct.colors?.[0] || null);
      setSelectedSize(null); // Reset size on product change
      setQty(1);
    }
    else {
      fetch_Data();
    }
    scrollTo(0, 0);
  }, [location.state]);

  // 3. GSAP Animations
  useLayoutEffect(() => {
    if (!productData) return;

    let ctx = gsap.context(() => {
      gsap.from(".gallery-img", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".product-info-content > *", {
        x: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out"
      });
    }, pageRef);

    return () => ctx.revert();
  }, [productData]);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // 4. Loading Guard
  if (!productData) {
    return <div className="loading-screen">Loading architectural piece...</div>;
  }

  const handleShare = async () => {
    const shareData = {
      title: productData.title,
      text: `Check out this ${productData.title} on Aura Commerce!`,
      url: window.location.href,
    };

    try {
      // Check if the browser supports native sharing (Mobile/Safari)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard for Desktop
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
        // Pro-tip: Replace alert with a nice GSAP toast notification later
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };
  return (
    <div className="product-page" ref={pageRef}>

      {/* LEFT: SCROLLABLE GALLERY */}
      <div className="product-gallery" ref={galleryRef}>
        <div className="image-container">
          <img
            src={productData.image_url}
            alt={productData.title}
            className="gallery-img"
          />
        </div>
      </div>

      {/* RIGHT: STICKY INFO PANEL */}
      <div className="product-info" ref={infoRef}>
        <div className="product-info-content">
          <div className="breadcrumbs">HOME / SHOP / {productData.category?.toUpperCase() || 'COLLECTION'}</div>

          <h1 className="pdp-title">{productData.title}</h1>
          <p className="pdp-price">$ {productData.price}</p>
          <p className="pdp-desc">{productData.description}</p>

          <div className="divider"></div>

          {/* COLOR SELECTOR */}
          {productData.colors && (
            <div className="selector-group">
              <span className="label">COLOR: {selectedColor?.name}</span>
              <div className="color-options">
                {productData.colors.map((c) => (
                  <button
                    key={c.name}
                    className={`color-btn ${selectedColor?.name === c.name ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SIZE SELECTOR */}
          <div className="selector-group">
            <div className="label-row">
              <span className="label">SIZE</span>
              <span className="size-guide-link"><FiInfo /> SIZE GUIDE</span>
            </div>
            <div className="size-grid">
              {productData.sizes?.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="error-msg">* Please select a size</p>}
          </div>

          {/* ACTIONS */}
          <div className="action-row">
            <div className="qty-selector">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><FiMinus /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}><FiPlus /></button>
            </div>
            <button className="add-to-cart-btn" disabled={!selectedSize}>
              ADD TO BAG — {productData.currency || 'USD'} {(productData.price * qty).toFixed(2)}
            </button>
            <button className="wishlist-btn"><FiHeart /></button>
          </div>

          {productData.stock < 10 && (
            <div className="stock-indicator">
              <span className="dot"></span> ONLY {productData.stock} PIECES LEFT
            </div>
          )}

          <div className="divider"></div>

          {/* ACCORDIONS */}
          <div className="accordions">
            {productData.details?.map((item, index) => (
              <div className="accordion-item" key={index}>
                <button className="accordion-header" onClick={() => toggleAccordion(index)}>
                  {item.title}
                  {activeAccordion === index ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <div
                  className="accordion-body"
                  style={{
                    maxHeight: activeAccordion === index ? '200px' : '0',
                    opacity: activeAccordion === index ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="share-row" onClick={handleShare} style={{ cursor: 'pointer' }}>
            <FiShare2 /> SHARE THIS PRODUCT
          </div>
        </div>
      </div>

      <Contact />
      <Footer />
    </div>
  );
};

export default ProductPage;