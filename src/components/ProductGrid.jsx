import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductGrid.css';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: "STRUCTURAL BLAZER", price: "$450", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "COMBAT DERBY BOOT", price: "$320", img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "OVERSIZED TOTE", price: "$180", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "PLEATED WIDE LEG", price: "$210", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop" },
];

const ProductGrid = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="product-section" ref={containerRef}>
      <div className="product-grid">
        {products.map((product) => (
          <Link to={"/product"} className="product-card" key={product.id}>
            <div className="card-image-wrapper">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="card-info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;