import React from 'react';
import { useSelector } from 'react-redux';

/**
 * Payment component for processing payment with items in the cart.
 */
const Payment = () => {
  // Get cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);


  // Handler function to process payment.

  const handlePayment = () => {
    // Logic to process payment
  };

  return (
    <div className="container mx-auto my-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Payment</h2>

      {/* Display items in the cart */}
      {cartItems.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-700">
            Price: {item.price}€, Quantity: {item.quantity}
          </p>
        </div>
      ))}

      {/* Button to initiate payment, disabled if the cart is empty */}
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded"
        onClick={handlePayment}
        disabled={cartItems.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;
