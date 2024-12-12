// src/components/dashboard/TestRecommendations.js
import React from 'react';

const TestRecommendations = ({ recommendations }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">AI Test Önerileri</h2>
            <div className="space-y-4">
                {recommendations.map((rec, index) => (
                    <div key={index} className="border p-4 rounded">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{rec.type}</span>
                            <span className={`px-2 py-1 rounded text-sm ${
                                rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                                    rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                            }`}>
                {rec.priority}
              </span>
                        </div>
                        <p className="mt-2 text-gray-600">{rec.description}</p>
                        <div className="mt-2 text-sm text-gray-500">
                            Güven Oranı: {(rec.confidence * 100).toFixed(1)}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestRecommendations;