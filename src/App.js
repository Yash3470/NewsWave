// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import News from './components/News';
import Footer from './components/Footer';
import SearchResults from './components/SearchResults';
import HeroSection from './components/HeroSection';
import './App.css';
import './index.css'; // Import global styles



function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
     <Routes>
          <Route exact path="/" element={<><HeroSection /> <News key="general" category="general" /></>} />
          <Route exact path="/business" element={<News category="business" />} />
          <Route exact path="/technology" element={<News category="technology" />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route exact path="/entertainment" element={<News category="entertainment" />} />
    </Routes>
    <Footer /> 
    </BrowserRouter>
   
  );
}

export default App;
