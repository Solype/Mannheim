import React from "react";

interface HealthBarProps {
    current: number;
    max: number;
    barColor?: string;
    backBarColor?: string;
}


const HealthBar: React.FC<HealthBarProps> = ({ current, max, barColor = 'bg-green-500', backBarColor = 'bg-red-500'}) => {
    const res = max <= 0 ? 0 : (current / max) * 100;
    const percentage = res > 100 ? 100 : res < 0 ? 0 : res;
    const finalBarColor = max <= 0 ? 'bg-gray-200' : barColor;
    const finalBackBarColor = max <= 0 ? 'bg-gray-200' : backBarColor;

    return (
        <div className={`w-full ${finalBackBarColor} rounded-full h-2.5 relative`}>
            <div
                className={`${finalBarColor} h-2.5 rounded-full`}
                style={{ width: `${percentage}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-black">
                {current} / {max}
            </span>
        </div>
    );
};

export default HealthBar;
