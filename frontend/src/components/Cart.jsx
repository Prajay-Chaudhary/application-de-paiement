import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
  // Get cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Access the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Update the cart in the Redux store based on the action (increase, decrease, remove)
  const updateCart = (product, action) => {
    dispatch({ type: 'UPDATE_CART', payload: { product, action } });
  };

  // State to hold the total price of items in the cart
  const [total, setTotal] = useState(0);

  // Calculate the total price whenever cart items change
  useEffect(() => {
    let totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  // React Router's navigate hook for navigation
  const navigate = useNavigate();

  // Navigate to the payment page
  const goToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="container mx-auto my-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>

      {/* Display a message when the cart is empty */}
      {cartItems.length === 0 ? <p>Your cart is empty</p> : null}

      {/* Render each item in the cart */}
      {cartItems.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-700">
            Price: {item.price}€, Quantity: {item.quantity}
          </p>

          {/* Buttons for adjusting item quantity and removing item */}
          <div className="flex mt-2 ">
            <button
              className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
              onClick={() => updateCart(item, 'decrease')}
            >
              -
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
              onClick={() => updateCart(item, 'increase')}
            >
              +
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => updateCart(item, 'remove')}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Display the total price of items in the cart */}
      <h3 className="text-xl font-bold">Total: {total}€</h3>

      {/* Button to proceed to the payment page */}
      <button
        className="bg-purple-500 text-white px-4 py-2 mt-4 rounded"
        onClick={goToPayment}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Cart;

