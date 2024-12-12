// src/services/testRunnerService.js
import { apiService } from './apiService';

export class TestRunner {
    constructor() {
        this.results = [];
        this.currentSuite = null;
    }

    async runTest(test) {
        const startTime = performance.now();
        let result = {
            name: test.name,
            status: 'PENDING',
            startTime: new Date().toISOString(),
            duration: 0,
            error: null,
            response: null
        };

        try {
            let response;
            switch (test.method) {
                case 'GET':
                    response = await apiService[test.serviceMethod](...(test.params || []));
                    break;
                case 'POST':
                    response = await apiService[test.serviceMethod](test.body);
                    break;
                default:
                    throw new Error('Desteklenmeyen metod');
            }

            result.status = 'PASSED';
            result.response = response;

            // Test assertions
            if (test.assertions) {
                for (const assertion of test.assertions) {
                    const assertionResult = this.runAssertion(assertion, response);
                    if (!assertionResult.passed) {
                        result.status = 'FAILED';
                        result.error = assertionResult.message;
                        break;
                    }
                }
            }
        } catch (error) {
            result.status = 'ERROR';
            result.error = error.message;
        }

        result.duration = performance.now() - startTime;
        this.results.push(result);
        return result;
    }

    runAssertion(assertion, response) {
        try {
            switch (assertion.type) {
                case 'statusCode':
                    return {
                        passed: response.status === assertion.value,
                        message: `Status code ${response.status} does not match expected ${assertion.value}`
                    };
                case 'hasProperty':
                    return {
                        passed: response.hasOwnProperty(assertion.value),
                        message: `Response missing property ${assertion.value}`
                    };
                default:
                    return { passed: false, message: 'Unknown assertion type' };
            }
        } catch (error) {
            return { passed: false, message: error.message };
        }
    }

    getResults() {
        return {
            total: this.results.length,
            passed: this.results.filter(r => r.status === 'PASSED').length,
            failed: this.results.filter(r => r.status === 'FAILED').length,
            errors: this.results.filter(r => r.status === 'ERROR').length,
            results: this.results
        };
    }
}