import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import "../styles/Cart.css"

function Cart() {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  const [localCart, setLocalCart] = useState(cartItems); // Local state to track changes
  const navigate = useNavigate();

  // Synchronize local cart state with context whenever cartItems change
  useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  const totalPrice = localCart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {localCart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {localCart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>${item.price}</p>
                <div className="cart-controls">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                  <button onClick={() => removeFromCart(item.id)}><i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
