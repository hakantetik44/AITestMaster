// src/data/testScenarios.js
export const testScenarios = [
    {
        id: 'TS001',
        name: 'Ürün Listesi Testi',
        description: 'Tüm ürünlerin başarıyla getirildiğini kontrol eder',
        method: 'GET',
        serviceMethod: 'getProducts',
        assertions: [
            { type: 'statusCode', value: 200 },
            { type: 'hasProperty', value: 'length' }
        ]
    },
    {
        id: 'TS002',
        name: 'Kullanıcı Girişi Testi',
        description: 'Geçerli kimlik bilgileriyle giriş yapılabildiğini kontrol eder',
        method: 'POST',
        serviceMethod: 'login',
        body: {
            username: 'mor_2314',
            password: '83r5^_'
        },
        assertions: [
            { type: 'statusCode', value: 200 },
            { type: 'hasProperty', value: 'token' }
        ]
    }
];