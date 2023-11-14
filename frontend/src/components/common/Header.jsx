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
    <header className="bg-gray-800 text-white p-4 flex flex-col items-center relative">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our e-commerce Shopping Site</h1>

      <div className="flex space-x-4 relative">
        <NavLink to="/" className="text-white-500 text-2xl hover:underline">
          Products
        </NavLink>
        <NavLink to="/payment" className="text-white-500 text-2xl hover:underline">
          Payment
        </NavLink>
        <NavLink to="/cart" className="text-blue-500 hover:underline relative">
          <div className="cart-icon relative">
            <FontAwesomeIcon icon={faShoppingCart} className="text-yellow-600 text-5xl relative z-10" />
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
