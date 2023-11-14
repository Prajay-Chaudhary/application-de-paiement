import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Toast, { showToast } from '../components/toaster/Toast';


//Payment component for processing payment with items in the cart.

const Payment = () => {
  // Get cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();


  // Handler function to process payment.
  const handlePayment = () => {
    const orderData = {
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    axios
      .post('http://localhost:4000/api/create-order', orderData, { responseType: 'blob' })
      .then((response) => {
        // Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: 'application/pdf' });

        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);

        // Clear the cart after successful order processing
        dispatch({ type: 'CLEAR_CART' });

        showToast('Order placed successfully!', 'success');
      })
      .catch((error) => {
        console.error('Error processing order:', error);
        showToast('Error processing order. Please try again.', 'error');
      });
  };

  return (
    <div className="container mx-auto my-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Payment</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-700">
            Price: {item.price}€, Quantity: {item.quantity}
          </p>
        </div>
      ))}

      <button
        className="bg-purple-500 text-white px-4 py-2 rounded"
        onClick={handlePayment}
        disabled={cartItems.length === 0}
      >
        Check Out!
      </button>
      <Toast />
    </div>
  );
};

export default Payment;
