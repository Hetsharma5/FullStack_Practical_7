import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

// Navigation Header Component with Dynamic Cart Count
const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="main-header">
      <nav className="nav-container">
        <div className="logo">
          <Link to="/">LUXE<span>STORE</span></Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Store</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-wrapper">
          <Header />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <footer className="main-footer">
            <p>&copy; 2026 LuxeStore. Academic Project for FSD.</p>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
