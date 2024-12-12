// src/pages/Tests.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Modal from '../components/Modal';
import CreateTestForm from '../components/CreateTestForm';
import TestRunModal from '../components/TestRunModal';

const Tests = () => {
    const navigate = useNavigate();

    // Tüm state'ler
    const [tests, setTests] = useState([
        {
            id: 1,
            name: 'Login Test Suite',
            type: 'UI Test',
            status: 'Başarılı',
            lastRun: '2024-12-12',
            duration: '45s',
            aiCreated: true,
            priority: 'High'
        },
        {
            id: 2,
            name: 'Payment API Tests',
            type: 'API Test',
            status: 'Başarısız',
            lastRun: '2024-12-11',
            duration: '30s',
            aiCreated: false,
            priority: 'Critical'
        }
    ]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isRunModalOpen, setIsRunModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);

    // Event handlers
    const handleCreateTest = (formData) => {
        const newTest = {
            id: tests.length + 1,
            ...formData,
            status: 'Yeni',
            lastRun: '-',
            duration: '-',
            aiCreated: formData.useAI
        };

        setTests([...tests, newTest]);
        setIsCreateModalOpen(false);
    };

    const handleRunTest = (test) => {
        setSelectedTest(test);
        setIsRunModalOpen(true);
    };

    const handleTestComplete = (result) => {
        setTests(prevTests =>
            prevTests.map(test =>
                test.id === selectedTest.id
                    ? {
                        ...test,
                        status: result.status,
                        lastRun: new Date().toLocaleDateString(),
                        duration: result.duration
                    }
                    : test
            )
        );
        setIsRunModalOpen(false);
    };

    const handleTestClick = (testId) => {
        navigate(`/tests/${testId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Test Senaryoları</h1>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Yeni Test Oluştur
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left font-medium text-gray-500">Test Adı</th>
                            <th className="p-4 text-left font-medium text-gray-500">Tür</th>
                            <th className="p-4 text-left font-medium text-gray-500">Öncelik</th>
                            <th className="p-4 text-left font-medium text-gray-500">Durum</th>
                            <th className="p-4 text-left font-medium text-gray-500">Son Çalıştırma</th>
                            <th className="p-4 text-left font-medium text-gray-500">Süre</th>
                            <th className="p-4 text-left font-medium text-gray-500">AI</th>
                            <th className="p-4 text-left font-medium text-gray-500">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {tests.map(test => (
                            <tr
                                key={test.id}
                                className="hover:bg-gray-50 cursor-pointer"
                            >
                                <td
                                    className="p-4"
                                    onClick={() => handleTestClick(test.id)}
                                >
                                    {test.name}
                                </td>
                                <td className="p-4">{test.type}</td>
                                <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                        test.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                            test.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                test.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                    }`}>
                      {test.priority}
                    </span>
                                </td>
                                <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                        test.status === 'Başarılı' ? 'bg-green-100 text-green-800' :
                            test.status === 'Başarısız' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                    }`}>
                      {test.status}
                    </span>
                                </td>
                                <td className="p-4">{test.lastRun}</td>
                                <td className="p-4">{test.duration}</td>
                                <td className="p-4">
                                    {test.aiCreated ? '✓' : '-'}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleRunTest(test)}
                                        className="text-blue-500 hover:text-blue-700 mr-3"
                                    >
                                        Çalıştır
                                    </button>
                                    <button
                                        onClick={() => handleTestClick(test.id)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Detay
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Modals */}
                <Modal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    title="Yeni Test Oluştur"
                >
                    <CreateTestForm
                        onSubmit={handleCreateTest}
                        onClose={() => setIsCreateModalOpen(false)}
                    />
                </Modal>

                <TestRunModal
                    isOpen={isRunModalOpen}
                    onClose={() => setIsRunModalOpen(false)}
                    test={selectedTest}
                    onRunComplete={handleTestComplete}
                />
            </div>
        </div>
    );
};

export default Tests;