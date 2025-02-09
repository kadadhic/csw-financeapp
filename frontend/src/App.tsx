import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StockTicker from './components/StockTicker';
import Dashboard from './pages/Dashboard';
import Screener from './pages/Screener';
import Portfolio from './pages/Portfolio';
import InstantLoan from './pages/InstantLoan';
import BusinessNews from './pages/BusinessNews';
import TradeNow from './pages/TradeNow';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <StockTicker />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/loan" element={<InstantLoan />} />
            <Route path="/news" element={<BusinessNews />} />
            <Route path="/trade" element={<TradeNow />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; 