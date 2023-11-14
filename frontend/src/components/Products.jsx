import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Function to add a product to the cart
  const addToCart = (product) => {
    if (product.inventory > 0) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    } else {
      console.error('Product is out of stock');
      setError('Product is out of stock');
    }
  };

  // Fetch products from the server when the component mounts
  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:4000/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">{error}</p>;

  // Render the list of products
  return (
    <div className="container mx-auto my-8 text-center">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearchChange}
        value={searchTerm}
        className="mb-4 p-2 border rounded"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <img className="text-gray-700" src={product.image} alt={product.name} />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">Price: {product.price}€</p>
            <p className="text-gray-700 mb-2">In Stock: {product.inventory}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-yellow-600 rounded-full p-3"
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
