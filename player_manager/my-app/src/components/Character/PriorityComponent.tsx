import React from 'react';
import { Priority } from '@/types';

interface PriorityComponentProps {
    priority: Priority;
}

const PriorityComponent: React.FC<PriorityComponentProps> = ({ priority }) => {
    if (!priority) return null;

    return (
        <div className="priority-section">
            <h3 className="text-2xl font-bold mb-4">Priority</h3>
            <ul className="space-y-2">
                {Object.entries(priority).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                        <span className="capitalize">{key}</span>
                        <span>{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PriorityComponent;
