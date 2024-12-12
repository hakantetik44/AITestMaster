// src/pages/Reports.js
import React, { useState } from 'react';
import Header from '../components/Header';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
    const [dateRange, setDateRange] = useState('week');
    const [reportData] = useState({
        summary: {
            totalTests: 287,
            passRate: 92.5,
            avgDuration: '1m 45s',
            totalFailures: 21
        },
        trends: [
            { date: '2024-12-12', passed: 45, failed: 3 },
            { date: '2024-12-11', passed: 42, failed: 5 },
            { date: '2024-12-10', passed: 38, failed: 2 }
        ],
        recentFailures: [
            {
                id: 1,
                testName: 'Login Authentication',
                failureDate: '2024-12-12',
                errorMessage: 'Timeout waiting for element',
                type: 'UI Test'
            },
            {
                id: 2,
                testName: 'Payment API',
                failureDate: '2024-12-11',
                errorMessage: 'Invalid response format',
                type: 'API Test'
            }
        ]
    });

    const generatePDF = () => {
        // PDF oluşturma ayarları
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: 'a4',
            compress: true,
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

        // Font ayarları
        doc.setFont("helvetica", "normal");

        // Başlık ve tarih
        const title = "Test Otomasyon Raporu";
        const pageWidth = doc.internal.pageSize.width;
        const titleWidth = (doc.getStringUnitWidth(title) * 20) / doc.internal.scaleFactor;
        const titleX = (pageWidth - titleWidth) / 2;

        doc.setFontSize(20);
        doc.text(title, titleX, 40);

        const tarih = new Date().toLocaleString('tr-TR', {
            timeZone: 'Europe/Istanbul'
        });
        doc.setFontSize(12);
        doc.text(`Oluşturma Tarihi: ${tarih}`, 40, 70);

        // Özet tablosu
        const summaryData = [
            [{ content: 'Toplam Test', styles: { halign: 'center' } },
                { content: 'Başarı Oranı', styles: { halign: 'center' } },
                { content: 'Ortalama Süre', styles: { halign: 'center' } },
                { content: 'Toplam Hata', styles: { halign: 'center' } }],
            [{ content: reportData.summary.totalTests.toString(), styles: { halign: 'center' } },
                { content: `${reportData.summary.passRate}%`, styles: { halign: 'center' } },
                { content: reportData.summary.avgDuration, styles: { halign: 'center' } },
                { content: reportData.summary.totalFailures.toString(), styles: { halign: 'center' } }]
        ];

        doc.autoTable({
            startY: 90,
            head: [summaryData[0].map(cell => cell.content)],
            body: [summaryData[1].map(cell => cell.content)],
            styles: {
                font: 'helvetica',
                fontSize: 11,
                cellPadding: 8,
                textColor: [0, 0, 0]
            },
            headStyles: {
                fillColor: [51, 122, 183],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            columnStyles: {
                0: { halign: 'center' },
                1: { halign: 'center' },
                2: { halign: 'center' },
                3: { halign: 'center' }
            },
            theme: 'grid'
        });

        // Trend analizi tablosu
        doc.setFontSize(14);
        doc.text('Trend Analizi', 40, doc.lastAutoTable.finalY + 30);

        const trendData = reportData.trends.map(trend => [
            trend.date,
            trend.passed.toString(),
            trend.failed.toString(),
            `${((trend.passed / (trend.passed + trend.failed)) * 100).toFixed(1)}%`
        ]);

        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 40,
            head: [['Tarih', 'Başarılı', 'Başarısız', 'Başarı Oranı']],
            body: trendData,
            styles: {
                font: 'helvetica',
                fontSize: 11,
                cellPadding: 8
            },
            headStyles: {
                fillColor: [51, 122, 183],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            theme: 'grid'
        });

        // Son hatalar tablosu
        doc.setFontSize(14);
        doc.text('Son Hatalar', 40, doc.lastAutoTable.finalY + 30);

        const failureData = reportData.recentFailures.map(failure => [
            failure.testName,
            failure.failureDate,
            failure.type,
            failure.errorMessage
        ]);

        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 40,
            head: [['Test Adı', 'Tarih', 'Tip', 'Hata Mesajı']],
            body: failureData,
            styles: {
                font: 'helvetica',
                fontSize: 11,
                cellPadding: 8
            },
            headStyles: {
                fillColor: [51, 122, 183],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            theme: 'grid'
        });

        // AI önerileri bölümü
        const addListItem = (text, y) => {
            doc.setFontSize(11);
            doc.text('•', 45, y);
            doc.text(text, 60, y);
            return y + 20;
        };

        doc.setFontSize(14);
        doc.text('AI Test Önerileri', 40, doc.lastAutoTable.finalY + 30);

        let yPos = doc.lastAutoTable.finalY + 50;
        doc.setFontSize(12);
        doc.text('Test Kapsamı İyileştirmeleri:', 40, yPos);
        yPos += 20;

        yPos = addListItem('Login testlerine yeni senaryolar eklenebilir', yPos);
        yPos = addListItem('API testlerinin hata durumları artırılabilir', yPos);
        yPos = addListItem('Performans testleri için yük senaryoları güncellenebilir', yPos);

        yPos += 10;
        doc.text('Optimizasyon Önerileri:', 40, yPos);
        yPos += 20;

        yPos = addListItem('Paralel test çalıştırma ile süre optimize edilebilir', yPos);
        yPos = addListItem('Test veri setleri güncellenebilir', yPos);
        yPos = addListItem('Önbellek mekanizması iyileştirilebilir', yPos);

        // PDF'i kaydet
        const fileName = `test-raporu-${new Date().toISOString().slice(0, 10)}.pdf`;
        doc.save(fileName);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Test Raporları</h1>
                    <div className="flex space-x-2">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="border rounded-md px-3 py-2"
                        >
                            <option value="day">Son 24 Saat</option>
                            <option value="week">Son 7 Gün</option>
                            <option value="month">Son 30 Gün</option>
                        </select>
                        <button
                            onClick={generatePDF}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Rapor İndir
                        </button>
                    </div>
                </div>

                {/* Özet Kartları */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm">Toplam Test</h3>
                        <p className="text-3xl font-bold">{reportData.summary.totalTests}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm">Başarı Oranı</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {reportData.summary.passRate}%
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm">Ortalama Süre</h3>
                        <p className="text-3xl font-bold">{reportData.summary.avgDuration}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm">Toplam Hata</h3>
                        <p className="text-3xl font-bold text-red-600">
                            {reportData.summary.totalFailures}
                        </p>
                    </div>
                </div>

                {/* Hata Detayları ve Trend Analizi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Son Hatalar */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Son Hatalar</h2>
                        <div className="space-y-4">
                            {reportData.recentFailures.map(failure => (
                                <div key={failure.id} className="border-l-4 border-red-500 pl-4">
                                    <h3 className="font-semibold">{failure.testName}</h3>
                                    <div className="text-sm text-gray-600">
                                        <p>Tarih: {failure.failureDate}</p>
                                        <p>Tip: {failure.type}</p>
                                        <p className="text-red-600">Hata: {failure.errorMessage}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trend Analizi */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Trend Analizi</h2>
                        <table className="w-full">
                            <thead>
                            <tr>
                                <th className="text-left py-2">Tarih</th>
                                <th className="text-left py-2">Başarılı</th>
                                <th className="text-left py-2">Başarısız</th>
                                <th className="text-left py-2">Başarı Oranı</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportData.trends.map((trend, index) => {
                                const successRate = ((trend.passed / (trend.passed + trend.failed)) * 100).toFixed(1);
                                return (
                                    <tr key={index} className="border-t">
                                        <td className="py-2">{trend.date}</td>
                                        <td className="py-2 text-green-600">{trend.passed}</td>
                                        <td className="py-2 text-red-600">{trend.failed}</td>
                                        <td className="py-2">{successRate}%</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Önerileri */}
                <div className="mt-6 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">AI Test Önerileri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold mb-2">Test Kapsamı İyileştirmeleri</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Login testlerine yeni senaryolar eklenebilir</li>
                                <li>API testlerinin hata durumları artırılabilir</li>
                                <li>Performans testleri için yük senaryoları güncellenebilir</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold mb-2">Optimizasyon Önerileri</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Paralel test çalıştırma ile süre optimize edilebilir</li>
                                <li>Test veri setleri güncellenebilir</li>
                                <li>Önbellek mekanizması iyileştirilebilir</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;