import React, { useState } from 'react';
import HealthBar from './HeathBar';
import NumberInputPopup from './NumberInput'; // Assurez-vous que le nom du fichier est correct

interface ClickableHealthBarProps {
    current: number;
    max: number;
    onUpdateCurrent: (newCurrent: number) => void;
    barColor?: string;
    backBarColor?: string;
}

const ClickableHealthBar: React.FC<ClickableHealthBarProps> = ({ current, max, onUpdateCurrent, barColor = 'bg-green-500', backBarColor = 'bg-red-500' }) => {
    const [isNumberInputOpen, setNumberInputOpen] = useState(false);

    const openNumberInput = () => {
        setNumberInputOpen(true);
    };

    const closeNumberInput = () => {
        setNumberInputOpen(false);
    };

    const handleNumberSubmit = ({ operator, value }: { operator: string, value: number }) => {
        const newCurrent = operator === '+' ? current + value : operator === '-' ? current - value : value;
        if (onUpdateCurrent) {
            onUpdateCurrent(newCurrent); // Met à jour le current dans le parent (envoi au serveur)
        }
        closeNumberInput();
    };

    return (
        <>
            <div onClick={openNumberInput} className="cursor-pointer">
                <HealthBar current={current} max={max} barColor={barColor} backBarColor={backBarColor} />
            </div>
            {isNumberInputOpen && (
                <NumberInputPopup isOpen={isNumberInputOpen} onClose={closeNumberInput} onSubmit={handleNumberSubmit} />
            )}
        </>
    );
};

export default ClickableHealthBar;
