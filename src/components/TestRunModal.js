// src/components/TestRunModal.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const TestRunModal = ({ isOpen, onClose, test, onRunComplete }) => {
    const [status, setStatus] = useState('PENDING');
    const [logs, setLogs] = useState('');

    useEffect(() => {
        if (isOpen && test) {
            setStatus('RUNNING');
            setLogs('Test başlatılıyor...\n');

            const steps = [
                { message: 'Test ortamı hazırlanıyor...', delay: 1000 },
                { message: `${test.name} testi başlatıldı...`, delay: 2000 },
                { message: 'Test adımları çalıştırılıyor...', delay: 3000 },
                { message: 'Sonuçlar kontrol ediliyor...', delay: 4000 },
                { message: 'Test tamamlandı.', delay: 5000 }
            ];

            steps.forEach(({ message, delay }) => {
                setTimeout(() => {
                    setLogs(prev => prev + message + '\n');
                }, delay);
            });

            setTimeout(() => {
                setStatus('COMPLETED');
                onRunComplete({
                    status: 'Başarılı',
                    duration: '1m 30s'
                });
            }, 6000);
        }

        return () => {
            setStatus('PENDING');
            setLogs('');
        };
    }, [isOpen, test, onRunComplete]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Test Çalıştırılıyor: ${test?.name}`}
        >
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <div className="font-semibold">Durum:</div>
                    <div className={`px-2 py-1 rounded text-sm ${
                        status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                            status === 'RUNNING' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                    }`}>
                        {status}
                    </div>
                </div>

                <div className="border rounded p-4 bg-gray-50 h-48 overflow-auto">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {logs}
          </pre>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        disabled={status === 'RUNNING'}
                        className={`px-4 py-2 rounded ${
                            status === 'RUNNING'
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                    >
                        {status === 'RUNNING' ? 'Çalışıyor...' : 'Kapat'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TestRunModal;