import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

// Component for displaying and managing products
const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);  // State for storing products
  const [loading, setLoading] = useState(false);  // State for loading indicator
  const [error, setError] = useState('');  // State for error messages

  // Function to add a product to the cart
  const addToCart = (product) => {
    if (product.inventory > 0) {
      // Make a copy of products array
      const updatedProducts = [...products];
      // Find the index of the selected product in the copied array
      const selectedProductIndex = updatedProducts.findIndex((p) => p.id === product.id);

      // If the product is found and has inventory, update the inventory and dispatch the action
      if (selectedProductIndex !== -1 && updatedProducts[selectedProductIndex].inventory > 0) {
        updatedProducts[selectedProductIndex].inventory--;
        dispatch({ type: 'ADD_TO_CART', payload: product });
        setProducts(updatedProducts);
      }
    } else {
      console.error('Product is out of stock');
      setError('Product is out of stock');
    }
  };

  // Fetch products from the server when the component mounts
  useEffect(() => {
    setLoading(true);

    // Fetch products from the server
    axios
      .get('http://localhost:4000/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);  // Empty dependency array ensures the effect runs only once on mount

  // Display loading message while data is being fetched
  if (loading) return <p className="text-center">Loading...</p>;

  // Display error message if there is an error fetching products
  if (error) return <p className="text-center">{error}</p>;

  // Render the list of products
  return (
    <div className="container mx-auto my-8 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">Price: {product.price}€</p>
            <p className="text-gray-700">In Stock: {product.inventory}</p>
            {/* Button to add the product to the cart */}
            <button
              onClick={() => addToCart(product)}
              className={`cart-button ${product.inventory === 0 ? 'disabled' : ''}`}
              disabled={product.inventory === 0}
            >
              {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
