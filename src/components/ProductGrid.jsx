import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductGrid.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);






const ProductGrid = () => {

  const [products, setProducts] = useState([
    { id: 1, name: "STRUCTURAL BLAZER", price: "$450", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, name: "COMBAT DERBY BOOT", price: "$320", img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, name: "OVERSIZED TOTE", price: "$180", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, name: "PLEATED WIDE LEG", price: "$210", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop" },
  ]);


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


  useEffect(() => {
    const fetch_products = async () => {
      try {
        const response = await axios.post("https://aura-commerce-znkm.onrender.com/fetch-products", {
          token: localStorage.getItem("jwt")
        })
        console.log(response.data);
        setProducts(response.data.products)
      } catch (e) {
        console.error("Error:", e);
      }
    }
    fetch_products()
  },[])

  return (
    <section className="product-section" ref={containerRef}>
      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} state={{product: product}} className="product-card" key={product._id} style={{textDecoration:"none"}}>
            <div className="card-image-wrapper">
              <img src={product.image_url} alt={product.title} />
            </div>
            <div className="card-info">
              <h3 style={{textDecoration:"none"}}>{product.title}</h3>
              <p>{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;