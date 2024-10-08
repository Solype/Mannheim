// src/components/Tools.tsx
"use client";

import React, { useState, useEffect } from 'react';
import LiveNumber from '@/components/Tools/LiveNumber';
import ReverseLiveNumber from '@/components/Tools/ReverseLiveNumber';
import ArmorCalculator from '@/components/Tools/ArmorCalculator';

const Tools: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        const handleThemeChange = (e: MediaQueryListEvent) => {
            setIsDarkTheme(e.matches);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkTheme(darkThemeMediaQuery.matches);
        darkThemeMediaQuery.addEventListener('change', handleThemeChange);

        return () => {
            window.removeEventListener('resize', handleResize);
            darkThemeMediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, []);

    return (
        <>
            <button
                className="fixed top-4 right-4 z-50 p-2 bg-blue-500 text-white rounded-lg shadow-lg"
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? 'Close Tools' : 'Open Tools'}
            </button>

            <div
                className={`fixed top-0 right-0 h-full shadow-lg transition-transform transform ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } ${isSmallScreen ? 'w-full' : 'w-80'} overflow-y-auto z-40 ${
                    isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black'
                }`}
            >
                <p className="text-3xl font-bold p-4">Tools</p>
                <div className="p-4 space-y-4">
                    <LiveNumber />
                    <ReverseLiveNumber />
                    <ArmorCalculator />
                </div>
            </div>
        </>
    );
};

export default Tools;
