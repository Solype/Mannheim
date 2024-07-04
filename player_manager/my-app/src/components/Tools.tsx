// src/components/Tools.tsx
"use client";

import React from 'react';
import LiveNumber from '@/components/Tools/LiveNumber';
import ReverseLiveNumber from '@/components/Tools/ReverseLiveNumber';
import ArmorCalculator from '@/components/Tools/ArmorCalculator';

const Tools: React.FC = () => {
    return (<>
        <p className="text-3xl font-bold">Tools</p>
            <div className="flex gap-4">
                <LiveNumber />
                <ReverseLiveNumber />
                <ArmorCalculator />
            </div>
    </>);
};

export default Tools;
