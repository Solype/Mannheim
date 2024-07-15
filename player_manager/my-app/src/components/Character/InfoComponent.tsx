import React from 'react';
import { Infos } from '@/types';

interface InfoComponentProps {
    infos: Infos | undefined;
    file: string | undefined;
    name: string | undefined;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ infos, file, name }) => {
    if (!infos) return null;

    return (
        <div className="info-section">
            <h3 className="text-2xl font-bold mb-4">Informations</h3>
            <ul className="space-y-2">
                <li className="flex justify-between">
                    <span className="capitalize">File</span>
                    <span>{file}</span>
                </li>
                <li className="flex justify-between">
                    <span className="capitalize">Name</span>
                    <span>{name}</span>
                </li>
                <li className="flex justify-between">
                    <span className="capitalize">Age</span>
                    <span>{infos.age}</span>
                </li>
                <li className="flex justify-between">
                    <span className="capitalize">Gender</span>
                    <span>{infos.gender}</span>
                </li>
                <li className="flex justify-between">
                    <span className="capitalize">Race</span>
                    <span>{infos.race}</span>
                </li>
            </ul>
        </div>
    );
};

export default InfoComponent;
