import React, { useState } from 'react';

interface SkillProps {
    name: string;
    val1: number;
    val2: number;
    onClick?: () => void; // La fonction onClick est optionnelle
}

const Skill: React.FC<SkillProps> = ({ name, val1, val2, onClick }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleNameClick = () => {
        if (onClick) {
            onClick();
        }
    };

    const handleNumberClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="flex justify-between items-center p-2 rounded">
            <span
                className="rounded font-medium cursor-pointer border border-transparent hover:border-blue-500 hover:bg-blue-500 hover:text-white p-1"
                onClick={handleNameClick}
            >
                {name}:
            </span>
            <span
                className="font-semibold cursor-pointer"
                onClick={handleNumberClick}
            >
                {showDetails ? `${val1} + ${val2}` : val1 + val2}
            </span>
        </div>
    );
};

export default Skill;
