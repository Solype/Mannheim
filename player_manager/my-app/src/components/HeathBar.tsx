import React from "react";

const HealthBar = ({ current, max }) => {
    const percentage = (current / max) * 100;

    return (
        <div className="w-full bg-red-600 rounded-full h-2.5 relative">
            <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
                ></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-black">
            {current} / {max}
            </span>
      </div>
    );
};

export default HealthBar;
