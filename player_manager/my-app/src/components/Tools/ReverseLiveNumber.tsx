// src/components/ReverseLiveNumber.tsx
import React, { useState } from 'react';

const tab = [
    0, 6, 18, 28, 34, 40, 45, 50, 53, 55,
    57, 59, 61, 63, 65, 67, 68, 69, 70, 71,
    72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
    82, 83, 84, 85, 86, 87, 88, 89, 89, 90,
    90, 91, 91, 92, 92, 93, 93, 94
];

const ReverseLiveNumber: React.FC = () => {
    const [finalNumber, setFinalNumber] = useState<number>(1);

    const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        
        if (!isNaN(value)) {
            if (value <= 0) {
                setFinalNumber(1);
                return;
            }
            let index = tab.length - 1;
            for (let i = 0; i < tab.length; i++) {
                if (tab[i] >= value) {
                    index = i;
                    break;
                }
            }
            setFinalNumber(index);
        } else {
            setFinalNumber(0);
        }
    };

    // Function to format number with leading zero if necessary
    const formatNumber = (num: number): string => {
        return num.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
    };

    return (
        <div className="flex items-center border border-gray-300 rounded p-4">
            <input
                type="number"
                onChange={handleNumberChange}
                className="px-4 py-2 border rounded text-center text-black w-24"
                placeholder="Enter number"
                // w-24 sets a fixed width for the input
            />
            <div className="ml-2">
                <span className="ml-2" role="img" aria-label="Dice Icon" style={{ fontSize: '2rem' }}>🎲</span>
                <span className="ml-2" role="img" aria-label="Arrow Icon" style={{ fontSize: '2rem' }}>➡️</span>
                <span className="ml-2" role="img" aria-label="Character Icon" style={{ fontSize: '2rem' }}>👤</span>
            </div>
            <span className="text-4xl font-bold">{formatNumber(finalNumber)}</span>
        </div>
    );
};

export default ReverseLiveNumber;
