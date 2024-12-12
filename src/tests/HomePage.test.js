// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
      <div>
        <h1>TechMart - En Yeni Teknoloji Ürünleri</h1>
        <div className="products">
          {products.map(product => (
              <div key={product.id} data-testid={`product-${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.price} TL</p>
                <button>Sepete Ekle</button>
              </div>
          ))}
        </div>
      </div>
  );
};

export default HomePage;