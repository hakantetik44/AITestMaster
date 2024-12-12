// src/pages/TestHistory.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { historyService } from '../services/historyService';
import { ReportGenerator } from '../services/reportService';

const TestHistory = () => {
    const [history, setHistory] = useState([]);
    const [selectedRun, setSelectedRun] = useState(null);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        const testHistory = historyService.getHistory();
        setHistory(testHistory);
    };

    const handleRunSelect = (run) => {
        setSelectedRun(run);
    };

    const generatePDF = (run) => {
        const reportGenerator = new ReportGenerator(run);
        const doc = reportGenerator.generatePDF();
        doc.save(`test-report-${run.id}.pdf`);
    };

    const clearHistory = () => {
        if (window.confirm('Tüm geçmişi silmek istediğinize emin misiniz?')) {
            historyService.clearHistory();
            loadHistory();
            setSelectedRun(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Test Geçmişi</h1>
                    <button
                        onClick={clearHistory}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Geçmişi Temizle
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Test Geçmişi Listesi */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Test Koşumları</h2>
                            <div className="space-y-4">
                                {history.map(run => (
                                    <div
                                        key={run.id}
                                        onClick={() => handleRunSelect(run)}
                                        className={`border rounded p-4 cursor-pointer hover:bg-gray-50 ${
                                            selectedRun?.id === run.id ? 'border-blue-500 bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-medium">
                                                    {new Date(run.timestamp).toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Toplam Test: {run.summary.total}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-green-600">
                                                    Başarılı: {run.summary.passed}
                                                </div>
                                                <div className="text-sm text-red-600">
                                                    Başarısız: {run.summary.failed}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Test Detayları */}
                    <div className="lg:col-span-2">
                        {selectedRun ? (
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold">Test Detayları</h2>
                                    <button
                                        onClick={() => generatePDF(selectedRun)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        PDF İndir
                                    </button>
                                </div>

                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    <div className="text-center p-4 bg-gray-50 rounded">
                                        <div className="text-2xl font-bold">{selectedRun.summary.total}</div>
                                        <div className="text-sm text-gray-600">Toplam</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded">
                                        <div className="text-2xl font-bold text-green-600">
                                            {selectedRun.summary.passed}
                                        </div>
                                        <div className="text-sm text-gray-600">Başarılı</div>
                                    </div>
                                    <div className="text-center p-4 bg-red-50 rounded">
                                        <div className="text-2xl font-bold text-red-600">
                                            {selectedRun.summary.failed}
                                        </div>
                                        <div className="text-sm text-gray-600">Başarısız</div>
                                    </div>
                                    <div className="text-center p-4 bg-yellow-50 rounded">
                                        <div className="text-2xl font-bold text-yellow-600">
                                            {selectedRun.summary.errors}
                                        </div>
                                        <div className="text-sm text-gray-600">Hata</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {selectedRun.results.map((result, index) => (
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
                        ) : (
                            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-gray-500">
                                Detayları görüntülemek için bir test koşumu seçin
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestHistory;