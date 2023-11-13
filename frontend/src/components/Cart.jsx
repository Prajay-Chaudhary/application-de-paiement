import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Component for displaying and managing the shopping cart
const Cart = () => {
  // Retrieve cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Function to update the cart based on the specified action (decrease, increase, remove)
  const updateCart = (product, action) => {
    dispatch({ type: 'UPDATE_CART', payload: { product, action } });
  };

  // State to track the total price of items in the cart
  const [total, setTotal] = useState(0);

  // Update the total price when cart items change
  useEffect(() => {
    let totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  // Hook for navigating to the payment page
  const navigate = useNavigate();

  // Function to navigate to the payment page
  const goToPayment = () => {
    navigate('/payment');
  };

  return (
    <>
      <div className="container mx-auto my-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? <p>Your cart is empty</p> : null}
        {cartItems.map((item) => (
          <div key={item.id} className="mb-4 p-4 border rounded">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-700">
              Price: {item.price}€, Quantity: {item.quantity}
            </p>
            <div className="flex mt-2 justify-center">
              {item.inventory > 0 && (
                <>
                  {/* Button to decrease quantity */}
                  <button
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                    onClick={() => updateCart(item, 'decrease')}
                  >
                    -
                  </button>
                  {/* Button to increase quantity */}
                  <button
                    className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                    onClick={() => updateCart(item, 'increase')}
                  >
                    +
                  </button>
                </>
              )}
              {/* Button to remove item from the cart */}
              <button
                className={`bg-red-500 text-white px-2 py-1 rounded ${item.inventory === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => updateCart(item, 'remove')}
                disabled={item.inventory === 0}
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
    </>
  );
};

export default Cart;
