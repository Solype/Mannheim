import React, { useState } from 'react';
import { Infos } from '@/types';

interface InfoComponentProps {
    infos: Infos | undefined;
    file: string | undefined;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ infos, file }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [selectedInfo, setSelectedInfo] = useState<string | null>(null);

    if (!infos) return null;

    const handleItemClick = (infoType: string) => {
        setSelectedInfo(infoType);
        setIsModalOpen(true);
    };

    const handleOkClick = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${file}/infos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: selectedInfo,
                    value: modalContent
                })
            })
            window.location.reload();
        } catch (error) {
            console.error('Error updating info:', error);
        }
    };

    const handleCancelClick = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    const className = "flex justify-between hover:cursor-pointer hover:text-blue-500 hover:underline"

    return (
        <div className="info-section">
            <h3 className="text-2xl font-bold mb-4">Informations</h3>
            <ul className="space-y-2">
                <li className={className} onClick={() => handleItemClick('name')}>
                    <span className="capitalize">Name</span>
                    <span>{infos.name}</span>
                </li>
                <li className={className} onClick={() => handleItemClick('age')}>
                    <span className="capitalize">Age</span>
                    <span>{infos.age}</span>
                </li>
                <li className={className} onClick={() => handleItemClick('gender')}>
                    <span className="capitalize">Gender</span>
                    <span>{infos.gender}</span>
                </li>
                <li className={className} onClick={() => handleItemClick('race')}>
                    <span className="capitalize">Race</span>
                    <span>{infos.race}</span>
                </li>
            </ul>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-black border border-white p-4 rounded">
                        <h4 className="text-xl font-bold mb-2">Update {selectedInfo}</h4>
                        <textarea
                            value={modalContent}
                            onChange={(e) => setModalContent(e.target.value)}
                            className="w-full p-2 border rounded mb-4 text-black"
                        />
                        <div className="flex justify-between w-full">
                            <button onClick={handleOkClick} className="px-4 py-2 bg-blue-500 text-white rounded">OK</button>
                            <button onClick={handleCancelClick} className="px-4 py-2 bg-red-500 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoComponent;
