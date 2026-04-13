import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    category: '',
    countInStock: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!image) {
      setMessage({ type: 'error', text: 'Please select an image' });
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('brand', formData.brand);
    data.append('category', formData.category);
    data.append('countInStock', formData.countInStock);
    data.append('image', image);

    try {
      await api.post('/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage({ type: 'success', text: 'Product added successfully!' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to add product' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen">
      <div className="admin-form-container">
        <h1 className="page-title">Catalog Management</h1>
        <p className="subtitle">Add a new premium product to your store</p>

        {message.text && (
          <div className={`alert ${message.type === 'error' ? 'error-alert' : 'success-alert'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-add-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input name="name" type="text" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input name="brand" type="text" value={formData.brand} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input name="category" type="text" value={formData.category} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>
              <input name="countInStock" type="number" value={formData.countInStock} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <input type="file" onChange={handleFileChange} required accept="image/*" className="file-input" />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="4"></textarea>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
            {loading ? 'Processing...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
