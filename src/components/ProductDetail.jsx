import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
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
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="product-detail-info">
          <span className="product-category-tag">{product.category}</span>
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-detail-rating">
            <span className="rating-stars">{"★".repeat(Math.round(product.rating?.rate || 0)) + "☆".repeat(5 - Math.round(product.rating?.rate || 0))}</span>
            <span className="rating-count">({product.rating?.count || 0} reviews)</span>
          </div>
          
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>
          
          <button 
            className="btn btn-primary btn-lg" 
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
