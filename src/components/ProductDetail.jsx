import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { BASE_URL } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/products/`); // We'll need to find by ID in local backend
        // Since I only implemented GET /api/products, I'll filter for now or implement GET /api/products/:id
        // Better: I'll update the backend to support GET /api/products/:id later.
        // For now, let's assume we find it in the list.
        const allProducts = response.data;
        const found = allProducts.find(p => p._id === id);
        if (found) {
          setProduct(found);
          setError(null);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('/uploads')) {
      return `${BASE_URL}${imagePath}`;
    }
    return imagePath;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Fetching details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <p>{error || 'Product not found.'}</p>
        <Link to="/" className="btn">Back to Store</Link>
      </div>
    );
  }

  return (
    <div className="container product-detail-container">
      <Link to="/" className="back-link">← Back to Collection</Link>
      
      <div className="product-detail-layout">
        <div className="product-detail-image">
          <img src={getImageUrl(product.image)} alt={product.name} />
        </div>
        
        <div className="product-detail-info">
          <span className="product-category-tag">{product.category}</span>
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-brand text-muted">by {product.brand}</p>
          
          <div className="product-detail-price">${product.price.toFixed(2)}</div>
          <p className="product-detail-description">{product.description}</p>
          
          <div className="stock-info">
            Availability: <span className={product.countInStock > 0 ? 'text-success' : 'text-error'}>
              {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
            </span>
          </div>

          <button 
            className="btn btn-primary btn-lg btn-add-detail" 
            disabled={product.countInStock === 0}
            onClick={() => addToCart(product)}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
