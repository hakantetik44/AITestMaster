import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/featured-products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Ürünler yüklenirken hata oluştu:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">TechMart - En Yeni Teknoloji Ürünleri</h1>

      <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="border p-4 rounded-lg hover:shadow-lg transition"
            data-testid={`product-${product.id}`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-xl mt-2">{product.name}</h2>
            <p className="text-green-600 font-bold">{product.price} TL</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              data-testid={`add-to-cart-${product.id}`}
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;