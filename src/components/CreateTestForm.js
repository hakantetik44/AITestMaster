// src/components/CreateTestForm.js
import React, { useState } from 'react';

const CreateTestForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'UI Test',
        description: '',
        priority: 'Normal',
        useAI: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Test Adı</label>
                <input
                    type="text"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Test Tipi</label>
                <select
                    name="type"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="UI Test">UI Test</option>
                    <option value="API Test">API Test</option>
                    <option value="Integration Test">Integration Test</option>
                    <option value="Performance Test">Performance Test</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Açıklama</label>
                <textarea
                    name="description"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Öncelik</label>
                <select
                    name="priority"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="Low">Düşük</option>
                    <option value="Normal">Normal</option>
                    <option value="High">Yüksek</option>
                    <option value="Critical">Kritik</option>
                </select>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="useAI"
                    className="rounded border-gray-300 text-blue-600"
                    checked={formData.useAI}
                    onChange={handleChange}
                />
                <label className="ml-2 block text-sm text-gray-700">
                    AI önerilerini kullan
                </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Oluştur
                </button>
            </div>
        </form>
    );
};

export default CreateTestForm;