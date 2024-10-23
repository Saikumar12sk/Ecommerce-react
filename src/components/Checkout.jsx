import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Checkout.css'; 

function Checkout() {
  const { cartItems } = useCart();
  const [form, setForm] = useState({ name: '', address: '', payment: '' });
  const [submitted, setSubmitted] = useState(false); // Track submission state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark as submitted to show the confirmation message
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (submitted) {
    return (
      <div className="confirmation">
        <h2>Order Confirmed!</h2>
        <p>Thank you, {form.name}, for your order.</p>
        <p>Your items will be shipped to: {form.address}</p>
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id}>
            <p>
              {item.title}: ${item.price} × {item.quantity}
            </p>
          </div>
        ))}
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <p>Payment Method: {form.payment}</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Payment Details:</label>
          <input
            type="text"
            name="payment"
            value={form.payment}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default Checkout;
