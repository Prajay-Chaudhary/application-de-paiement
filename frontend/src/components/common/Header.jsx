import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const Header = () => {
  // Get the total quantity of items in the cart from Redux store
  const totalItems = useSelector((state) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    // Header component with Flexbox and styling
    <header className="bg-gray-800 text-white p-4 flex flex-col items-center relative">
      {/* Main heading */}
      <h1 className="text-4xl font-bold mb-4">Welcome to Our e-commerce Shopping Site</h1>

      {/* Navigation links in a horizontal row */}
      <div className="flex space-x-4 relative">
        {/* Navigation link to Products */}
        <NavLink to="/" className="text-blue-500 hover:underline">
          Products
        </NavLink>


        {/* Navigation link to Payment */}
        <NavLink to="/payment" className="text-blue-500 hover:underline">
          Payment
        </NavLink>
        {/* Navigation link to Cart */}
        <NavLink to="/cart" className="text-blue-500 hover:underline relative">
          {/* Cart icon with item count */}
          <div className="cart-icon relative">
            <FontAwesomeIcon icon={faShoppingCart} className="text-white text-5xl relative z-10" />
            {totalItems > 0 && (
              <span className="cart-counter ml-2 absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full z-20">
                {totalItems}
              </span>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
