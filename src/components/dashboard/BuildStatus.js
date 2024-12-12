// src/components/dashboard/BuildStatus.js
import React, { useState, useEffect } from 'react';
import { jenkinsService } from '../../services/jenkins';

const BuildStatus = () => {
    const [builds, setBuilds] = useState([]);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Jenkins Build Durumu</h2>
            <table className="w-full">
                <thead className="bg-gray-50">
                <tr>
                    <th className="p-2 text-left">Build #</th>
                    <th className="p-2 text-left">Durum</th>
                    <th className="p-2 text-left">Süre</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="p-2">#123</td>
                    <td className="p-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                Başarılı
              </span>
                    </td>
                    <td className="p-2">2m 30s</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BuildStatus;