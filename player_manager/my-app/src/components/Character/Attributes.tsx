import React from 'react';

interface AttributeProps {
    name: string;
    value: number;
    onClick?: () => void; // La fonction onClick est optionnelle
}

const Attribute: React.FC<AttributeProps> = ({ name, value, onClick }) => {
    const handleNameClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="flex justify-between items-center p-2 rounded">
            <span
                className="font-medium rounded cursor-pointer border border-transparent hover:border-blue-500 hover:bg-blue-500 hover:text-white p-1"
                onClick={handleNameClick}
            >
                {name}:
            </span>
            <span className="font-semibold">
                {value}
            </span>
        </div>
    );
};

export default Attribute;
