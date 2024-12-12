// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const testService = {
    // Tüm testleri getir
    getAllTests: async () => {
        try {
            const response = await api.get('/tests');
            return response.data;
        } catch (error) {
            console.error('Tests fetch error:', error);
            throw error;
        }
    },

    // Test detaylarını getir
    getTestById: async (testId) => {
        try {
            const response = await api.get(`/tests/${testId}`);
            return response.data;
        } catch (error) {
            console.error('Test detail fetch error:', error);
            throw error;
        }
    },

    // Yeni test oluştur
    createTest: async (testData) => {
        try {
            const response = await api.post('/tests', testData);
            return response.data;
        } catch (error) {
            console.error('Test creation error:', error);
            throw error;
        }
    },

    // Test sonuçlarını güncelle
    updateTestResults: async (testId, results) => {
        try {
            const response = await api.put(`/tests/${testId}/results`, results);
            return response.data;
        } catch (error) {
            console.error('Test results update error:', error);
            throw error;
        }
    }
};

export const reportService = {
    // Test raporlarını getir
    getReports: async (dateRange) => {
        try {
            const response = await api.get('/reports', { params: { dateRange } });
            return response.data;
        } catch (error) {
            console.error('Reports fetch error:', error);
            throw error;
        }
    },

    // Detaylı rapor oluştur
    generateDetailedReport: async (filters) => {
        try {
            const response = await api.post('/reports/generate', filters);
            return response.data;
        } catch (error) {
            console.error('Report generation error:', error);
            throw error;
        }
    }
};