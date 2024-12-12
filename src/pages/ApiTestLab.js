import React, { useState } from 'react';
import Header from '../components/Header';

const ApiTestLab = () => {
    const [request, setRequest] = useState({
        method: 'GET',
        endpoint: '/products',
        headers: {},
        body: ''
    });

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [testHistory, setTestHistory] = useState([]);

    const requestMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    const baseUrl = 'https://fakestoreapi.com';

    const sendRequest = async () => {
        setLoading(true);
        try {
            const options = {
                method: request.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...request.headers
                }
            };

            if (['POST', 'PUT'].includes(request.method)) {
                options.body = request.body;
            }

            const url = `${baseUrl}${request.endpoint}`;

            console.log('İstek Detayları:', {
                url,
                method: request.method,
                headers: options.headers,
                body: options.body
            });

            const start = performance.now();
            const response = await fetch(url, options);
            const end = performance.now();
            const duration = (end - start).toFixed(2);

            const data = await response.json();

            const result = {
                timestamp: new Date().toISOString(),
                method: request.method,
                endpoint: request.endpoint,
                duration: `${duration}ms`,
                status: response.status,
                data
            };

            setResponse(result);
            console.log('API Yanıtı:', result);

            // Store test in history
            const testReport = {
                ...result,
                success: response.status >= 200 && response.status < 300
            };

            setTestHistory(prev => [testReport, ...prev].slice(0, 10)); // Keep last 10 tests

        } catch (error) {
            console.error('API Hatası:', error);
            const errorReport = {
                timestamp: new Date().toISOString(),
                method: request.method,
                endpoint: request.endpoint,
                error: error.message,
                status: 'ERROR',
                success: false
            };
            setResponse(errorReport);

            // Store error in test history
            setTestHistory(prev => [errorReport, ...prev].slice(0, 10));
        }
        setLoading(false);
    };

    const predefinedRequests = [
        {
            name: 'Tüm Ürünleri Getir',
            method: 'GET',
            endpoint: '/products',
            description: 'Tüm ürün listesini getirir'
        },
        {
            name: 'Tekil Ürün Getir',
            method: 'GET',
            endpoint: '/products/1',
            description: 'ID:1 olan ürünün detaylarını getirir'
        },
        {
            name: 'Kategori Listesi',
            method: 'GET',
            endpoint: '/products/categories',
            description: 'Tüm kategorileri listeler'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">API Test Laboratory</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sol Panel - Request Builder */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex gap-4 mb-4">
                                <select
                                    value={request.method}
                                    onChange={(e) => setRequest({ ...request, method: e.target.value })}
                                    className="border rounded px-3 py-2"
                                >
                                    {requestMethods.map(method => (
                                        <option key={method} value={method}>{method}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    value={request.endpoint}
                                    onChange={(e) => setRequest({ ...request, endpoint: e.target.value })}
                                    className="flex-1 border rounded px-3 py-2"
                                    placeholder="Endpoint ör: /products"
                                />
                                <button
                                    onClick={sendRequest}
                                    disabled={loading}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                                >
                                    {loading ? 'Gönderiliyor...' : 'Gönder'}
                                </button>
                            </div>

                            {['POST', 'PUT'].includes(request.method) && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Request Body (JSON)
                                    </label>
                                    <textarea
                                        value={request.body}
                                        onChange={(e) => setRequest({ ...request, body: e.target.value })}
                                        className="w-full h-40 border rounded px-3 py-2 font-mono text-sm"
                                        placeholder="{ 'key': 'value' }"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Response Section */}
                        {response && (
                            <div className="bg-white rounded-lg shadow p-6 mt-6">
                                <h2 className="text-xl font-semibold mb-4">Test Sonucu</h2>

                                <div className="space-y-4">
                                    {/* İstek Detayları */}
                                    <div className="p-4 bg-gray-50 rounded">
                                        <h3 className="font-medium mb-2">İstek Detayları</h3>
                                        <div className="text-sm space-y-1">
                                            <p><span className="font-medium">URL:</span> {baseUrl}{response.endpoint}</p>
                                            <p><span className="font-medium">Metod:</span> {response.method}</p>
                                            <p><span className="font-medium">Zaman:</span> {new Date(response.timestamp).toLocaleString()}</p>
                                            <p><span className="font-medium">Süre:</span> {response.duration}</p>
                                        </div>
                                    </div>

                                    {/* Hata veya Yanıt */}
                                    {response.error ? (
                                        <div className="p-4 bg-red-50 rounded">
                                            <h3 className="font-medium mb-2 text-red-700">Hata</h3>
                                            <p className="text-red-600">{response.error}</p>
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-gray-50 rounded">
                                            <h3 className="font-medium mb-2">Yanıt</h3>
                                            <pre className="overflow-auto max-h-96 text-sm">
                                                {JSON.stringify(response.data, null, 2)}
                                            </pre>
                                        </div>
                                    )}

                                    {/* Durum */}
                                    <div className="p-4 bg-gray-50 rounded">
                                        <h3 className="font-medium mb-2">Durum</h3>
                                        <span className={`px-2 py-1 rounded text-sm ${
                                            response.status >= 200 && response.status < 300
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {response.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Test History */}
                        {testHistory.length > 0 && (
                            <div className="bg-white rounded-lg shadow p-6 mt-6">
                                <h2 className="text-xl font-semibold mb-4">Test Geçmişi</h2>
                                <div className="space-y-2">
                                    {testHistory.map((test, index) => (
                                        <div
                                            key={index}
                                            className={`p-3 rounded ${
                                                test.success
                                                    ? 'bg-green-50 border-green-200'
                                                    : 'bg-red-50 border-red-200'
                                            } border`}
                                        >
                                            <div className="flex justify-between">
                                                <span>{test.method} {test.endpoint}</span>
                                                <span className="text-sm text-gray-600">
                                                    {new Date(test.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="text-sm">
                                                {test.status === 'ERROR'
                                                    ? `Hata: ${test.error}`
                                                    : `Durum: ${test.status}`
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sağ Panel - Hazır Testler */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Hazır Test Senaryoları</h2>
                        <div className="space-y-4">
                            {predefinedRequests.map((predefined, index) => (
                                <div
                                    key={index}
                                    className="border rounded p-4 cursor-pointer hover:bg-gray-50"
                                    onClick={() => setRequest({
                                        method: predefined.method,
                                        endpoint: predefined.endpoint,
                                        headers: {},
                                        body: ''
                                    })}
                                >
                                    <h3 className="font-medium">{predefined.name}</h3>
                                    <div className="text-sm text-gray-600 mt-1">
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                            {predefined.method}
                                        </span>
                                        <span className="ml-2">{predefined.endpoint}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {predefined.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiTestLab;