// src/services/reportService.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export class ReportGenerator {
    constructor(results) {
        this.results = results;
        this.pdf = new jsPDF();
    }

    generatePDF() {
        const doc = this.pdf;

        // Başlık
        doc.setFontSize(20);
        doc.text('Test Otomasyonu Raporu', 15, 15);

        // Tarih
        doc.setFontSize(12);
        doc.text(`Oluşturma Tarihi: ${new Date().toLocaleString()}`, 15, 25);

        // Özet Tablo
        doc.autoTable({
            startY: 35,
            head: [['Toplam Test', 'Başarılı', 'Başarısız', 'Hata']],
            body: [[
                this.results.total,
                this.results.passed,
                this.results.failed,
                this.results.errors
            ]]
        });

        // Detaylı Sonuçlar
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Test Adı', 'Durum', 'Süre', 'Hata']],
            body: this.results.results.map(result => [
                result.name,
                result.status,
                `${result.duration.toFixed(2)}ms`,
                result.error || '-'
            ])
        });

        return doc;
    }
}