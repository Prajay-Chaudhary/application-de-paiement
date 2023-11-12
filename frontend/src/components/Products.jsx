import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Products = () => {
  // Redux dispatch hook to update the state
  const dispatch = useDispatch();

  // Function to add a product to the cart
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // State to store the list of products
  const [products, setProducts] = useState([]);

  // States for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    // Set loading to true before making the API call
    setLoading(true);

    // Fetch products from the server
    axios
      .get('http://localhost:4000/products')
      .then((response) => {
        // Update the products state with the fetched data
        setProducts(response.data);
        // Set loading to false after successful data retrieval
        setLoading(false);
      })
      .catch((error) => {
        // Log the error to the console
        console.error('Error fetching products', error);
        // Set an error message for user feedback
        setError('Failed to load products.');
        // Set loading to false after an error occurs
        setLoading(false);
      });
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  // Render loading message if data is still being fetched
  if (loading) return <p className="text-center">Loading...</p>;

  // Render error message if an error occurred during data fetching
  if (error) return <p className="text-center">{error}</p>;

  // Render the list of products
  return (
    <div className="container mx-auto my-8 text-center">
      {/* Responsive grid layout for product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">Price: {product.price}€</p>
            <p className="text-gray-700">In Stock: {product.inventory}</p>
            {/* Button to add the product to the cart */}
            <button
              onClick={() => addToCart(product)}
              className="bg-yellow-600 text-white px-4 py-2 rounded-full mt-2 hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
