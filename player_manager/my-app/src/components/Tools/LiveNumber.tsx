// src/components/LiveNumber.tsx
import React, { useState } from 'react';

const tab = [
    0, 6, 18, 28, 34, 40, 45, 50, 53, 55,
    57, 59, 61, 63, 65, 67, 68, 69, 70, 71,
    72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
    82, 83, 84, 85, 86, 87, 88, 89, 89, 90,
    90, 91, 91, 92, 92, 93, 93, 94
];

const LiveNumber: React.FC = () => {
    const [displayNumber, setDisplayNumber] = useState<number>(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        
        // Validate input and update displayNumber accordingly
        if (!isNaN(value)) {
            if (value < 0) {
                setDisplayNumber(0); // Ensure displayNumber doesn't go below 0
            } else if (value >= tab.length) {
                setDisplayNumber(tab[tab.length - 1]); // Set to the last number in tab if input exceeds array length
            } else {
                setDisplayNumber(tab[value]);
            }
        } else {
            setDisplayNumber(0); // Reset to 0 if input is not a valid number
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
        <div className="flex flex-col items-center border border-gray-300 rounded p-4 w-full">
            <div className="flex items-center mb-2 w-full">
                <input
                    type="number"
                    onChange={handleChange}
                    className="px-4 py-2 border rounded text-center text-black w-full"
                    placeholder="Enter number"
                />
            </div>
            <div className="flex items-center">
                <span className="ml-2" role="img" aria-label="Icons" style={{ fontSize: '2rem' }}>👤➡️🎲</span>
            </div>
            <div className="mt-2 text-4xl font-bold">{formatNumber(displayNumber)}</div>
        </div>
    );
};

export default LiveNumber;
