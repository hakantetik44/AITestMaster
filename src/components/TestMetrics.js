// src/components/dashboard/TestMetrics.js
import React from 'react';

const TestMetrics = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Test Metrikleri</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-semibold">Toplam Test</h3>
                    <p className="text-2xl">156</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                    <h3 className="font-semibold">Başarılı</h3>
                    <p className="text-2xl">142</p>
                </div>
                <div className="bg-red-50 p-4 rounded">
                    <h3 className="font-semibold">Başarısız</h3>
                    <p className="text-2xl">14</p>
                </div>
            </div>
        </div>
    );
};

export default TestMetrics;