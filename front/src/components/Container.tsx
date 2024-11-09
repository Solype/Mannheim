import React from 'react';
import NavbarTop from './NavbarTop';
import NavbarLeft from './NavbarLeft';
import { useLocation } from 'react-router-dom';


const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }
    return (
        <div className="relative h-screen">
            <NavbarTop />
            <div className="flex h-full">
                <NavbarLeft />
                <div className="flex-1 ml-20 mt-16">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Container;
