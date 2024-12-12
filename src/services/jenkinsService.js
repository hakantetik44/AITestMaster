// src/services/jenkinsService.js
const JENKINS_STATUS = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    IN_PROGRESS: 'IN_PROGRESS',
    PENDING: 'PENDING'
};

const jenkinsService = {
    runTest: async (testId) => {
        // Simüle edilmiş Jenkins job tetikleme
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    buildNumber: Math.floor(Math.random() * 1000),
                    status: JENKINS_STATUS.IN_PROGRESS
                });
            }, 1000);
        });
    },

    getBuildStatus: async (buildNumber) => {
        // Simüle edilmiş build durumu kontrolü
        return new Promise((resolve) => {
            setTimeout(() => {
                const statuses = [JENKINS_STATUS.SUCCESS, JENKINS_STATUS.FAILURE];
                resolve({
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                    duration: '1m 30s',
                    logs: 'Test execution logs...'
                });
            }, 2000);
        });
    }
};

export default jenkinsService;