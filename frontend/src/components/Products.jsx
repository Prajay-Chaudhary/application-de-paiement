import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Toast, { showToast } from '../components/toaster/Toast';

// Products Component
const Products = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Redux action type constant
  const ADD_TO_CART = 'ADD_TO_CART';

  // Add a product to the cart
  const addToCart = (product) => {
    if (product.localInventory > 0) {
      dispatch({ type: ADD_TO_CART, payload: product });
      showToast('Item added to cart');
      // Update local inventory and dispatch action
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id === product.id
            ? { ...prevProduct, localInventory: prevProduct.localInventory - 1 }
            : prevProduct
        )
      );
    } else {
      console.error('Product is out of stock');
      setError('Product is out of stock');
    }
  };

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        // Map products and set local inventory
        const productsWithInventory = response.data.map((product) => ({
          ...product,
          localInventory: product.inventory,
        }));
        console.log('Fetched products:', productsWithInventory);
        setProducts(productsWithInventory);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
        setError('Failed to load products. Please try again.');
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      console.log('Products component unmounted');
    };
  }, [setProducts]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <p className="text-gray-700 mb-2">Items remaining to add into the cart: {product.localInventory}</p>
            {/* Add to cart button */}
            <button
              onClick={() => addToCart(product)}
              className={`bg-yellow-600 rounded-full p-3 text-white ${product.localInventory === 0 && 'cursor-not-allowed'
                }`}
              disabled={product.localInventory === 0}
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
