import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Header from './components/common/Header';
import NotFound from './components/NotFound';

// Main component for the application
const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
