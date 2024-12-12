// src/components/AIAnalysis.js
import React from 'react';

const AIAnalysis = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">AI Analiz Sonuçları</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded">
                    <h3 className="font-semibold">Risk Analizi</h3>
                    <p>Risk Seviyesi: Düşük</p>
                    <p>Güven Skoru: %92</p>
                </div>
                <div className="p-4 bg-gray-50 rounded">
                    <h3 className="font-semibold">Öneriler</h3>
                    <ul className="list-disc pl-4">
                        <li>Login testlerini artır</li>
                        <li>API testlerini güncelle</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AIAnalysis;