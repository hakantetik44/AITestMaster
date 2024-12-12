// src/components/Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'text-white bg-blue-700' : 'text-blue-100 hover:text-white';
    };

    return (
        <header className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold">
                        AITestMaster
                    </Link>

                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link
                                    to="/"
                                    className={`px-3 py-2 rounded-md ${isActive('/')}`}
                                >
                                    Anasayfa
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/tests"
                                    className={`px-3 py-2 rounded-md ${isActive('/tests')}`}
                                >
                                    Testler
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/reports"
                                    className={`px-3 py-2 rounded-md ${isActive('/reports')}`}
                                >
                                    Raporlar
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;