import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminAddProduct from './components/AdminAddProduct';

const MainHeader = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  
  return (
    <header className="main-header">
      <nav className="nav-container">
        <div className="logo">
          <Link to="/">LUXE<span>STORE</span></Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Store</Link></li>
          {isAdmin && <li><Link to="/admin/add" className="admin-link">Add Product</Link></li>}
          {user ? (
            <>
              <li><button onClick={logout} className="nav-btn-link">Logout ({user.name})</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )
          }
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
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-wrapper">
            <MainHeader />
            <main className="content-area">
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/add" element={<AdminAddProduct />} />
              </Routes>
            </main>
            <footer className="main-footer">
              <p>&copy; 2026 LuxeStore. Academic Project for FSD.</p>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
