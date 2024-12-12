// src/services/apiService.js
const BASE_URL = 'https://fakestoreapi.com';

export const apiService = {
    // Tüm ürünleri getir
    getProducts: async () => {
        try {
            const response = await fetch(`${BASE_URL}/products`);
            if (!response.ok) throw new Error('Ürünler getirilemedi');
            return await response.json();
        } catch (error) {
            throw new Error(`Ürün listesi alınamadı: ${error.message}`);
        }
    },

    // Kategorileri getir
    getCategories: async () => {
        try {
            const response = await fetch(`${BASE_URL}/products/categories`);
            if (!response.ok) throw new Error('Kategoriler getirilemedi');
            return await response.json();
        } catch (error) {
            throw new Error(`Kategoriler alınamadı: ${error.message}`);
        }
    },

    // Login işlemi
    login: async (username, password) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            if (!response.ok) throw new Error('Login başarısız');
            return await response.json();
        } catch (error) {
            throw new Error(`Login hatası: ${error.message}`);
        }
    },

    // Sepet bilgilerini getir
    getCart: async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/carts/user/${userId}`);
            if (!response.ok) throw new Error('Sepet bilgisi getirilemedi');
            return await response.json();
        } catch (error) {
            throw new Error(`Sepet bilgisi alınamadı: ${error.message}`);
        }
    }
};