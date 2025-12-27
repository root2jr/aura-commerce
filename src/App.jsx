import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductPage from './components/ProductPage'; // Or move this to src/pages/ProductPage.js
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div style={{ padding: "10rem", textAlign: "center" }}>PAGE NOT FOUND</div>} />
      </Routes>
    </Router>
  );
}

export default App;