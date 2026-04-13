import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, cartTotal } = useCart();

  // Final total calculation using reduce is already handled in CartContext,
  // but let's show it explicitly here for the user's requirement.
  const finalTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container center-content">
        <h2>Your bag is currently empty</h2>
        <p>Return to the store to find something special.</p>
        <Link to="/" className="btn btn-primary">Go to Store</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Checkout Summary</h1>
      <div className="checkout-content">
        <div className="order-details card">
          <h3>Your Order</h3>
          <div className="order-items-list">
            {cart.map((item) => (
              <div key={item.id} className="order-item-row">
                <span className="order-item-name">
                  {item.title} <strong>x {item.quantity}</strong>
                </span>
                <span className="order-item-subtotal">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="order-total-row">
            <span>Total Amount to Pay</span>
            <span className="total-price">₹{finalTotal.toFixed(2)}</span>
          </div>
          
          <div className="payment-simulation mt-4">
            <p className="text-muted small">This is a simulation. No real payment will be processed.</p>
            <button 
              className="btn btn-primary btn-lg btn-block" 
              onClick={() => alert('Order Placed Successfully! (Simulation)')}
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
