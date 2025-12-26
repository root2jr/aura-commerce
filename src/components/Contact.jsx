import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        
        {/* Left: Giant Header */}
        <div className="contact-header">
          <h2>CLIENT<br />SERVICES</h2>
          <p>MON — SAT <br /> 9AM — 6PM EST</p>
        </div>

        {/* Right: Functional Form & Info */}
        <div className="contact-form-wrapper">
          <div className="direct-contacts">
            <div className="dc-item">
              <span>GENERAL INQUIRIES</span>
              <a href="mailto:info@achromatic.com">INFO@ACHROMATIC.COM</a>
            </div>
            <div className="dc-item">
              <span>PRESS / WHOLESALE</span>
              <a href="mailto:press@achromatic.com">PRESS@ACHROMATIC.COM</a>
            </div>
          </div>

          <form className="minimal-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" placeholder="FULL NAME" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="EMAIL ADDRESS" required />
            </div>
            <div className="form-group">
              <textarea placeholder="MESSAGE DETAIL" rows="4" required></textarea>
            </div>
            <button type="submit" className="submit-btn">SEND MESSAGE</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;