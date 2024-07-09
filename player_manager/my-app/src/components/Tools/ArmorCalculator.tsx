// src/components/ArmorCalculator.tsx
import React, { useState } from 'react';

const ArmorCalculator: React.FC = () => {
    const [number1, setNumber1] = useState<number>(0);
    const [number2, setNumber2] = useState<number>(0);
    const [number3, setNumber3] = useState<number>(0);
    const [sum, setSum] = useState<number>(0);

    const handleNumber1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setNumber1(value);
            calculateArmor(value, number2, number3); // Calculate sum whenever number1 changes
        } else {
            setNumber1(0); // Reset to 0 if input is not a number
            setSum(0); // Reset sum if input is not a number
        }
    };

    const handleNumber2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setNumber2(value);
            calculateArmor(number1, value, number3); // Calculate sum whenever number2 changes
        } else {
            setNumber2(0); // Reset to 0 if input is not a number
            setSum(0); // Reset sum if input is not a number
        }
    };

    const handleNumber3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setNumber3(value);
            calculateArmor(number1, number2, value); // Calculate sum whenever number3 changes
        } else {
            setNumber3(0); // Reset to 0 if input is not a number
            setSum(0); // Reset sum if input is not a number
        }
    };

    const calculateArmor = (damage: number, pene: number, armor: number) => {
        const damage_after_armor = (damage - armor) < 0 ? 0 : damage - armor;
        const compute_penetration = damage_after_armor + pene;
        const result = compute_penetration < 0 ? 0 : compute_penetration > damage ? damage : compute_penetration;
        setSum(result);
    };

    return (
        <div className="flex flex-col items-center border border-gray-300 rounded p-4 w-full">
            <div className="flex flex-col items-center mb-2 w-full">
                <div className="flex items-center mb-2 w-full">
                    <span role="img" aria-label="Damage Icon" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>💥</span>
                    <input
                        type="number"
                        value={number1}
                        onChange={handleNumber1Change}
                        className="px-4 py-2 border rounded text-center text-black w-full"
                        placeholder="Damage"
                    />
                </div>
                <div className="flex items-center mb-2 w-full">
                    <span role="img" aria-label="Penetration Icon" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🎯</span>
                    <input
                        type="number"
                        value={number2}
                        onChange={handleNumber2Change}
                        className="px-4 py-2 border rounded text-center text-black w-full"
                        placeholder="Penetration"
                    />
                </div>
                <div className="flex items-center w-full">
                    <span role="img" aria-label="Armor Icon" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🛡️</span>
                    <input
                        type="number"
                        value={number3}
                        onChange={handleNumber3Change}
                        className="px-4 py-2 border rounded text-center text-black w-full"
                        placeholder="Armor"
                    />
                </div>
            </div>
            <span className="mt-2" role="img" aria-label="Arrow Icon" style={{ fontSize: '2rem' }}>➡️</span>
            <div className="mt-2 text-4xl font-bold">{sum}</div>
        </div>
    );
};

export default ArmorCalculator;
