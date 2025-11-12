import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header cartCount={cart.length} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
            <Route path="/booking" element={<BookingPage cart={cart} setCart={setCart} />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
