import React, { useState } from 'react';
import Header from '../components/Header';

const TestScenarios = () => {
    const [scenarios, setScenarios] = useState([
        {
            id: 1,
            name: 'Kullanıcı Girişi Testi',
            aiGenerated: true,
            complexity: 'Yüksek'
        },
        {
            id: 2,
            name: 'Ödeme Akışı Testi',
            aiGenerated: false,
            complexity: 'Orta'
        }
    ]);

    return (
        <div>
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Test Senaryoları</h1>

                <div className="bg-white shadow rounded-lg">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Senaryo Adı</th>
                            <th className="p-3 text-left">AI Üretimi</th>
                            <th className="p-3 text-left">Karmaşıklık</th>
                            <th className="p-3 text-left">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scenarios.map(scenario => (
                            <tr key={scenario.id} className="border-b">
                                <td className="p-3">{scenario.name}</td>
                                <td className="p-3">
                                    {scenario.aiGenerated ? 'Evet' : 'Hayır'}
                                </td>
                                <td className="p-3">{scenario.complexity}</td>
                                <td className="p-3">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                        Detay
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TestScenarios;