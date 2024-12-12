import React, { useState } from 'react'; // Removed unused useEffect
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TestRunModal from '../components/TestRunModal';

const TestDetail = () => {
    // URL parametrelerini ve navigasyon hookunu al
    const { id } = useParams();
    const navigate = useNavigate();

    // Test detayları için state
    const [testDetails] = useState({
        id: 2,
        name: 'Login Test Suite', // Test adı
        type: 'UI Test', // Test türü
        status: 'Başarılı', // Mevcut test durumu
        description: 'Kullanıcı girişi ve çıkışı için temel test senaryoları', // Test açıklaması
        priority: 'High', // Öncelik seviyesi
        createdAt: '2024-12-01', // Oluşturulma tarihi
        lastRun: '2024-12-12', // Son çalıştırma tarihi
        steps: [
            'Login sayfasını aç',
            'Geçersiz kullanıcı bilgileri ile giriş dene',
            'Hata mesajlarını kontrol et',
            'Geçerli kullanıcı bilgileri ile giriş yap',
            'Yönlendirmeyi kontrol et'
        ]
    });

    // Test çalıştırma geçmişi
    const [runHistory] = useState([
        {
            date: '2024-12-12',
            status: 'Başarılı',
            duration: '1m 30s',
            executor: 'System'
        },
        {
            date: '2024-12-11',
            status: 'Başarısız',
            duration: '1m 45s',
            executor: 'Jenkins'
        },
        {
            date: '2024-12-10',
            status: 'Başarılı',
            duration: '1m 20s',
            executor: 'Manual'
        }
    ]);

    // Test çalıştırma modalı için state
    const [isRunModalOpen, setIsRunModalOpen] = useState(false);

    // Öncelik seviyesine göre CSS sınıfını belirle
    const getPriorityClass = (priority) => {
        return priority === 'High'
            ? 'bg-orange-100 text-orange-800'
            : 'bg-blue-100 text-blue-800';
    };

    // Test durumuna göre CSS sınıfını belirle
    const getStatusClass = (status) => {
        return status === 'Başarılı'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-6">
                {/* Navigasyon ve Kontrol Butonları */}
                <div className="mb-6 flex justify-between items-center">
                    {/* Geri dönüş butonu */}
                    <button
                        onClick={() => navigate('/tests')}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        ← Testlere Dön
                    </button>

                    {/* Testi çalıştırma butonu */}
                    <button
                        onClick={() => setIsRunModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Testi Çalıştır
                    </button>
                </div>

                {/* Test Detay Kartı */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* Test Başlığı ve Genel Bilgiler */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">{testDetails.name}</h1>

                            {/* Test Metadata */}
                            <div className="flex space-x-4 text-gray-600">
                                <span>ID: {id}</span>
                                <span>Tür: {testDetails.type}</span>

                                {/* Öncelik Etiketi */}
                                <span className={`px-3 py-1 rounded-full text-sm ${getPriorityClass(testDetails.priority)}`}>
                                    {testDetails.priority}
                                </span>

                                {/* Durum Etiketi */}
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(testDetails.status)}`}>
                                    {testDetails.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Test Detayları Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Sol Panel - Açıklama */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Test Detayları</h2>
                            <p className="text-gray-700 mb-4">{testDetails.description}</p>

                            {/* Ek Bilgiler */}
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-medium">Oluşturulma:</span> {testDetails.createdAt}
                                </div>
                                <div>
                                    <span className="font-medium">Son Çalıştırma:</span> {testDetails.lastRun}
                                </div>
                            </div>
                        </div>

                        {/* Sağ Panel - Test Adımları */}
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Test Adımları</h2>
                            <ol className="list-decimal list-inside space-y-2">
                                {testDetails.steps.map((step, index) => (
                                    <li key={index} className="text-gray-700">{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Çalıştırma Geçmişi */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Çalıştırma Geçmişi</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left">Tarih</th>
                                    <th className="px-4 py-2 text-left">Durum</th>
                                    <th className="px-4 py-2 text-left">Süre</th>
                                    <th className="px-4 py-2 text-left">Çalıştıran</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {runHistory.map((run, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">{run.date}</td>
                                        <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(run.status)}`}>
                                                    {run.status}
                                                </span>
                                        </td>
                                        <td className="px-4 py-2">{run.duration}</td>
                                        <td className="px-4 py-2">{run.executor}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Test Çalıştırma Modalı */}
                <TestRunModal
                    isOpen={isRunModalOpen}
                    onClose={() => setIsRunModalOpen(false)}
                    test={testDetails}
                />
            </div>
        </div>
    );
};

export default TestDetail;