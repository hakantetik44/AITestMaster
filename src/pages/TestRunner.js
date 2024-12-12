// src/pages/TestRunner.js
import React, { useState } from 'react';
import Header from '../components/Header';
import { TestRunner } from '../services/testRunnerService';
import { testScenarios } from '../data/testScenarios';

const TestRunnerPage = () => {
    const [selectedTests, setSelectedTests] = useState([]);
    const [results, setResults] = useState(null);
    const [running, setRunning] = useState(false);

    const testRunner = new TestRunner();

    const toggleTestSelection = (testId) => {
        setSelectedTests(prev =>
            prev.includes(testId)
                ? prev.filter(id => id !== testId)
                : [...prev, testId]
        );
    };

    const runTests = async () => {
        setRunning(true);
        setResults(null);

        for (const testId of selectedTests) {
            const test = testScenarios.find(t => t.id === testId);
            await testRunner.runTest(test);
        }

        setResults(testRunner.getResults());
        setRunning(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Test Runner</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Test Seçimi */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Test Senaryoları</h2>
                        <div className="space-y-4">
                            {testScenarios.map(test => (
                                <div
                                    key={test.id}
                                    className="border rounded p-4 flex items-center space-x-4"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedTests.includes(test.id)}
                                        onChange={() => toggleTestSelection(test.id)}
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    <div>
                                        <h3 className="font-medium">{test.name}</h3>
                                        <p className="text-sm text-gray-600">{test.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={runTests}
                            disabled={running || selectedTests.length === 0}
                            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {running ? 'Testler Çalışıyor...' : 'Seçili Testleri Çalıştır'}
                        </button>
                    </div>

                    {/* Test Sonuçları */}
                    {results && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Test Sonuçları</h2>

                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-4 bg-gray-50 rounded">
                                    <div className="text-2xl font-bold">{results.total}</div>
                                    <div className="text-sm text-gray-600">Toplam</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded">
                                    <div className="text-2xl font-bold text-green-600">{results.passed}</div>
                                    <div className="text-sm text-gray-600">Başarılı</div>
                                </div>
                                <div className="text-center p-4 bg-red-50 rounded">
                                    <div className="text-2xl font-bold text-red-600">{results.failed}</div>
                                    <div className="text-sm text-gray-600">Başarısız</div>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded">
                                    <div className="text-2xl font-bold text-yellow-600">{results.errors}</div>
                                    <div className="text-sm text-gray-600">Hata</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {results.results.map((result, index) => (
                                    <div
                                        key={index}
                                        className={`border rounded p-4 ${
                                            result.status === 'PASSED' ? 'border-green-200 bg-green-50' :
                                                result.status === 'FAILED' ? 'border-red-200 bg-red-50' :
                                                    'border-yellow-200 bg-yellow-50'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{result.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    Süre: {result.duration.toFixed(2)}ms
                                                </p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-sm ${
                                                result.status === 'PASSED' ? 'bg-green-200 text-green-800' :
                                                    result.status === 'FAILED' ? 'bg-red-200 text-red-800' :
                                                        'bg-yellow-200 text-yellow-800'
                                            }`}>
                        {result.status}
                      </span>
                                        </div>

                                        {result.error && (
                                            <div className="mt-2 text-sm text-red-600">
                                                Hata: {result.error}
                                            </div>
                                        )}
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

export default TestRunnerPage;