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
    // Set up the React Router using HashRouter for client-side routing
    <Router>
      <div className="App">
        {/* Include the common header component */}
        <Header />
        <main>
          {/* Define routes for different components */}
          <Routes>
            {/* Route for the products page */}
            <Route path="/" element={<Products />} />
            {/* Route for the shopping cart page */}
            <Route path="/cart" element={<Cart />} />
            {/* Route for the payment page */}
            <Route path="/payment" element={<Payment />} />
            {/* Route for the not found page */}
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
