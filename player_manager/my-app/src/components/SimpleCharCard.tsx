// components/Card.js
import React from 'react';
import ClickableHealthBar from './ClickableHealthBar';
import { HealthData } from '../types';

interface SimpleCharCardProps {
    jsonData: HealthData;
    onUpdateCurrent: (name: string, monitor: string, newCurrent: number) => Promise<void> | null;
}

const SimpleCharCard: React.FC<SimpleCharCardProps> = ({ jsonData, onUpdateCurrent }) => {
    return (
        <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 border-gray-400"
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2 className="mb-3 text-2xl font-semibold">
                {jsonData["name"]}{' '}
            </h2>
            <div className="space-y-2">
                <div>
                    <p className="text-xs font-medium mb-1">Mana</p>
                    <ClickableHealthBar current={jsonData["mana"][0]} max={jsonData["mana"][1]}
                        onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "mana", n)}
                    />
                </div>
                <div>
                    <p className="text-xs font-medium mb-1">Physique</p>
                    <ClickableHealthBar current={jsonData["physical health"][0]} max={jsonData["physical health"][1]}
                        onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "physical health", n)}
                    />
                </div>
                <div>
                    <p className="text-xs font-medium mb-1">Mental</p>
                    <ClickableHealthBar current={jsonData["mental health"][0]} max={jsonData["mental health"][1]}
                        onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "mental health", n)}
                />
                </div>
                <div>
                    <p className="text-xs font-medium mb-1">Stamina</p>
                    <ClickableHealthBar current={jsonData["endurance health"][0]} max={jsonData["endurance health"][1]}
                        onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "endurance health", n)}
                    />
                </div>
                <div>
                    <p className="text-xs font-medium mb-1">Pathologique</p>
                    <ClickableHealthBar current={jsonData["pathological health"][0]} max={jsonData["pathological health"][1]}
                        onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "pathological health", n)}
                    />
                </div>
            </div>
        </a>
    );
};

export default SimpleCharCard;
