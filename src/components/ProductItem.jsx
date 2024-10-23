import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify'; 
import '../styles/ProductItem.css'; 

function ProductItem({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added successfully!`); // Show success toast
  };

  return (
    <div className="product-item card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-details">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductItem;
