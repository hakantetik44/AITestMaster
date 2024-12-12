// src/services/historyService.js
export const historyService = {
    saveTestRun(results) {
        const history = this.getHistory();
        const run = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            summary: {
                total: results.total,
                passed: results.passed,
                failed: results.failed,
                errors: results.errors
            },
            results: results.results
        };

        history.unshift(run);
        localStorage.setItem('test_history', JSON.stringify(history));
        return run;
    },

    getHistory() {
        const history = localStorage.getItem('test_history');
        return history ? JSON.parse(history) : [];
    },

    clearHistory() {
        localStorage.removeItem('test_history');
    }
};