import React, { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FiArrowRight, FiX } from 'react-icons/fi';
import './Auth.css';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  // 1. Add state for Full Name as well
  const [fullName, setFullName] = useState('');
  // Note: Your backend expects "username", but your placeholder says "EMAIL ADDRESS".
  // I will map the email input to the 'username' state to match your axios call.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isLogin]);

  const handleAuth = async (e) => {
    // 2. Prevent default form submission (page reload)
    e.preventDefault(); 
    
    try {
       // 3. Use the state variables directly here
       const payload = {
        username: username,
        password: password,
        // Only include fullName if it's a registration
        ...( !isLogin && { fullName: fullName }) 
       };

       console.log("Sending payload:", payload);

       const response = await axios.post("http://127.0.0.1:8000/auth", payload); 
       console.log(response.data);       
    } catch (error) {
        console.error("Error:", error);
    }
  }

  return (
    <div className="auth-page" ref={containerRef}>
      <Link to="/" className="close-auth"><FiX /></Link>

      <div className="auth-visual">
        <div className="visual-content">
          <h1>{isLogin ? "THE ARCHIVE" : "JOIN THE CULT"}</h1>
          <p>{isLogin ? "Access your saved silhouettes..." : "Be the first to know..."}</p>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-content" ref={formRef}>
          <div className="auth-header">
            <h2>{isLogin ? "IDENTIFY" : "REGISTER"}</h2>
            <div className="auth-toggle">
              <span>{isLogin ? "NEW HERE?" : "ALREADY A MEMBER?"}</span>
              <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "CREATE ACCOUNT" : "SIGN IN"}
              </button>
            </div>
          </div>

          {/* 4. Pass the event correctly */}
          <form className="brutalist-form" onSubmit={handleAuth}>
            
            {!isLogin && (
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="FULL NAME" 
                  required 
                  // BINDING
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <span className="focus-border"></span>
              </div>
            )}

            <div className="input-group">
              <input 
                id='mail' 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                required 
                // BINDING
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="focus-border"></span>
            </div>

            <div className="input-group">
              <input 
                id='password' 
                type="password" 
                placeholder="PASSWORD" 
                required 
                // BINDING
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-border"></span>
            </div>

            <div className="form-actions">
              {/* Remove onClick here; the form onSubmit handles it */}
              <button type="submit" className="submit-auth-btn">
                {isLogin ? "ENTER" : "JOIN"} <FiArrowRight />
              </button>
              
              {isLogin && (
                <a href="#" className="forgot-pass">FORGOT PASSWORD?</a>
              )}
            </div>

          </form>

          <div className="auth-footer">
            <p>BY CONTINUING, YOU AGREE TO OUR <a href="#">TERMS</a>.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;