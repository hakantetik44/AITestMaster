// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Tests from './pages/Tests';
import Reports from './pages/Reports';
import TestDetail from './pages/TestDetail';
import ApiTests from './pages/ApiTests';
import ApiTestLab from './pages/ApiTestLab';
import TestRunner from './pages/TestRunner';
import TestHistory from './pages/TestHistory';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/api-tests" element={<ApiTests />} />
                    <Route path="/tests" element={<Tests />} />
                    <Route path="/tests/:id" element={<TestDetail />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/api-lab" element={<ApiTestLab />} />
                    <Route path="/test-runner" element={<TestRunner />} />
                    <Route path="/test-history" element={<TestHistory />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;