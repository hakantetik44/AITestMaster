// src/pages/ApiTests.js
import React, { useState } from 'react';
import Header from '../components/Header';
import { apiService } from '../services/apiService';

const ApiTests = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedEndpoint, setSelectedEndpoint] = useState('products');
    const [testResult, setTestResult] = useState(null);

    const endpoints = [
        { id: 'products', name: 'Ürünleri Getir' },
        { id: 'categories', name: 'Kategorileri Getir' },
        { id: 'login', name: 'Login Test' },
        { id: 'cart', name: 'Sepet Test' }
    ];

    const runTest = async () => {
        setLoading(true);
        setError(null);
        try {
            let result;
            switch (selectedEndpoint) {
                case 'products':
                    result = await apiService.getProducts();
                    setProducts(result);
                    break;
                case 'categories':
                    result = await apiService.getCategories();
                    break;
                case 'login':
                    result = await apiService.login('mor_2314', '83r5^_');
                    break;
                case 'cart':
                    result = await apiService.getCart(1);
                    break;
                default:
                    break;
            }
            setTestResult(result);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">API Test Sayfası</h1>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex gap-4 mb-6">
                        <select
                            value={selectedEndpoint}
                            onChange={(e) => setSelectedEndpoint(e.target.value)}
                            className="border rounded px-3 py-2"
                        >
                            {endpoints.map(endpoint => (
                                <option key={endpoint.id} value={endpoint.id}>
                                    {endpoint.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={runTest}
                            disabled={loading}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {loading ? 'Test Çalışıyor...' : 'Testi Çalıştır'}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {testResult && (
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold mb-2">Test Sonucu:</h2>
                            <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
                        </div>
                    )}

                    {selectedEndpoint === 'products' && products.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4">Ürün Listesi</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {products.map(product => (
                                    <div key={product.id} className="border p-4 rounded">
                                        <h3 className="font-medium">{product.title}</h3>
                                        <p className="text-gray-600">${product.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApiTests;