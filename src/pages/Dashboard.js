// src/pages/Dashboard.js
import React from 'react';
import Header from '../components/Header';
import AIAnalysis from '../components/AIAnalysis';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Test Yönetim Paneli</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Test İstatistikleri</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">125</div>
                                <div className="text-gray-600">Toplam Test</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">115</div>
                                <div className="text-gray-600">Başarılı</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">10</div>
                                <div className="text-gray-600">Başarısız</div>
                            </div>
                        </div>
                    </div>
                    <AIAnalysis />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;