import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Toast, { showToast } from '../components/toaster/Toast';

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const ADD_TO_CART = 'ADD_TO_CART';

  const addToCart = (product) => {
    if (product.inventory > 0) {
      dispatch({ type: ADD_TO_CART, payload: product });
      showToast('Item added to cart');
    } else {
      console.error('Product is out of stock');
      setError('Product is out of stock');
    }
  };

  useEffect(() => {
    axios.get('http://localhost:4000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
        setError('Failed to load products. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleImageLoad = () => {
    // Image has loaded, set loading to false
    setLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">{error}</p>;

  return (
    <div className="container mx-auto my-8 text-center">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearchChange}
        value={searchTerm}
        className="mb-4 p-2 border rounded"
      />

      {filteredProducts.length === 0 && <p>No products found for '{searchTerm}'</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            {loading && <p>Loading image...</p>}
            <img
              className="mx-auto my-4"
              src={product.image}
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: '150px' }}
              onLoad={handleImageLoad}
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">Price: {product.price}€</p>
            <p className="text-gray-700 mb-2">In Stock: {product.inventory}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-yellow-600 rounded-full p-3 text-white"
            >
              Add to Cart
            </button>
            <Toast />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;