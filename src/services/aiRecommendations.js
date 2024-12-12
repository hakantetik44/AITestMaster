// src/services/aiRecommendations.js
const aiService = {
    generateTestSuggestions: async (codebase) => {
        // AI test önerileri
        return [
            {
                type: 'UI Test',
                description: 'Login form validation tests needed',
                priority: 'High',
                confidence: 0.89
            },
            {
                type: 'API Test',
                description: 'Payment endpoint error handling',
                priority: 'Medium',
                confidence: 0.75
            }
        ];
    }
};

export default aiService;