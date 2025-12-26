import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiPlus, FiMinus, FiHeart, FiShare2, FiChevronDown, FiChevronUp, FiInfo } from 'react-icons/fi';
import './ProductPage.css';
import Contact from './Contact';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const productData = {
  title: "STRUCTURAL WOOL BLAZER",
  price: 890,
  currency: "USD",
  description: "Constructed from Italian virgin wool. Features an exaggerated shoulder silhouette with raw hem detailing and a concealed magnetic closure. A study in architectural tailoring.",
  colors: [
    { name: "Obsidian", hex: "#050505" },
    { name: "Concrete", hex: "#808080" }
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop", // Context shot
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop", // Detail shot
  ],
  details: [
    { title: "COMPOSITION & CARE", content: "100% Virgin Wool. Lining: 100% Cupro. Dry Clean Only. Do not tumble dry." },
    { title: "SHIPPING & RETURNS", content: "Free global shipping on orders over $500. Returns accepted within 14 days of delivery." },
    { title: "SUSTAINABILITY", content: "Sourced from ethically managed farms in Tuscany. Zero-waste pattern cutting." }
  ]
};

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [qty, setQty] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  const pageRef = useRef(null);
  const galleryRef = useRef(null);
  const infoRef = useRef(null);

  // Animation Setup
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in images
      gsap.from(".gallery-img", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Slide in Info Panel
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
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="product-page" ref={pageRef}>
      
      {/* LEFT: SCROLLABLE GALLERY */}
      <div className="product-gallery" ref={galleryRef}>
        {productData.images.map((img, index) => (
          <div className="image-container" key={index}>
            <img src={img} alt={`View ${index + 1}`} className="gallery-img" />
          </div>
        ))}
      </div>

      {/* RIGHT: STICKY INFO PANEL */}
      <div className="product-info" ref={infoRef}>
        <div className="product-info-content">
          
          <div className="breadcrumbs">HOME / SHOP / OUTERWEAR</div>
          
          <h1 className="pdp-title">{productData.title}</h1>
          <p className="pdp-price">{productData.currency} {productData.price}</p>
          
          <p className="pdp-desc">{productData.description}</p>

          <div className="divider"></div>

          {/* COLOR SELECTOR */}
          <div className="selector-group">
            <span className="label">COLOR: {selectedColor.name}</span>
            <div className="color-options">
              {productData.colors.map((c) => (
                <button 
                  key={c.name}
                  className={`color-btn ${selectedColor.name === c.name ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div className="selector-group">
            <div className="label-row">
              <span className="label">SIZE</span>
              <span className="size-guide-link"><FiInfo /> SIZE GUIDE</span>
            </div>
            <div className="size-grid">
              {productData.sizes.map((size) => (
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
            <button className="add-to-cart-btn">
              ADD TO BAG — {productData.currency} {productData.price * qty}
            </button>
            <button className="wishlist-btn"><FiHeart /></button>
          </div>

          <div className="stock-indicator">
            <span className="dot"></span> ONLY 3 PIECES LEFT IN THIS SIZE
          </div>

          <div className="divider"></div>

          {/* ACCORDIONS */}
          <div className="accordions">
            {productData.details.map((item, index) => (
              <div className="accordion-item" key={index}>
                <button className="accordion-header" onClick={() => toggleAccordion(index)}>
                  {item.title}
                  {activeAccordion === index ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <div 
                  className="accordion-body"
                  style={{ 
                    maxHeight: activeAccordion === index ? '200px' : '0',
                    opacity: activeAccordion === index ? 1 : 0
                  }}
                >
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="share-row">
            <FiShare2 /> SHARE THIS PRODUCT
          </div>

        </div>
      </div>

      {/* CROSS SELL SECTION (Dark Theme) */}
      <div className="cross-sell-section">
        <h2>COMPLETE THE LOOK</h2>
        <div className="cross-sell-grid">
          {[1,2,3].map((i) => (
             <div key={i} className="cross-card">
               <div className="cross-img-box"></div>
               <div className="cross-info">
                 <span>ACCESSORY {i}</span>
                 <span>$120</span>
               </div>
             </div>
          ))}
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default ProductPage;