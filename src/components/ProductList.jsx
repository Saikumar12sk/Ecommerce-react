import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css'; // Styling

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartCount } = useCart(); // Access cart count

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products!</div>;

  return (
    <div>
      <header>
        <Link to="/cart">
          <div className="cart-icon">
            <i className="bi bi-cart" style={{ fontSize: '24px' }}></i>
            <span className="cart-count">{cartCount}</span>
          </div>
        </Link>
      </header>
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
