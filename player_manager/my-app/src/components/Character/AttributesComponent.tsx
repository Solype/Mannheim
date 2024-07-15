import React from 'react';
import { Attributes } from '@/types';

interface AttributesComponentProps {
    attributes: Attributes;
}

const AttributesComponent: React.FC<AttributesComponentProps> = ({ attributes }) => {
    if (!attributes) return null;

    return (
        <div className="attributes-section">
            <h3 className="text-2xl font-bold mb-4">Attributes</h3>
            <ul className="space-y-2">
                {Object.entries(attributes).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                        <span className="capitalize">{key}</span>
                        <span>{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttributesComponent;
