import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ürünleri fetch eden fonksiyon
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (err) {
            console.error("Ürünler yüklenirken hata oluştu:", err);
            setError('Ürünleri yüklerken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Yükleniyor durumu
    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    // Hata durumu
    if (error) {
        return <div>{error}</div>;
    }

    // Ürünleri listeleme
    return (
        <div>
            <h1>Ürün Listesi</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
