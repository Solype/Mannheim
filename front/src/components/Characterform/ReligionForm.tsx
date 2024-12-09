import CharacterModifiactionUtils from '@/services/CharacterModifiactionUtils';
import { useEffect, useState } from 'react';
import { Religion } from '@/types/character_types';

interface ReligionFormProps {
    listReligions: Religion[];
    setter: (gods: Religion[]) => void;
    disabled: boolean;
}

const ReligionForm = ({ listReligions, setter, disabled }: ReligionFormProps) => {
    const [availableReligions, setAvailableReligions] = useState<string[]>([]);

    useEffect(() => {
        CharacterModifiactionUtils.getGods().then(setAvailableReligions);
    }, []);

    const handleAddReligion = () => {
        if (availableReligions.length === 0) return;

        const firstReligion = availableReligions[0];
        setter([...listReligions, { god: firstReligion, devotion: 0 }]);
        setAvailableReligions((prev) => prev.filter((god) => god !== firstReligion));
    };

    const handleReligionChange = (index: number, newName: string) => {
        const updatedReligions = [...listReligions];
        const oldName = updatedReligions[index].god;

        updatedReligions[index].god = newName;
        setter(updatedReligions);

        setAvailableReligions((prev) => {
            const updatedAvailableReligions = prev.filter((god) => god !== newName);
            if (oldName) updatedAvailableReligions.push(oldName);
            return updatedAvailableReligions;
        });
    };

    const handleDevotionChange = (index: number, devotion: number) => {
        const updatedReligions = [...listReligions];
        updatedReligions[index].devotion = devotion;
        setter(updatedReligions);
    };

    const handleRemoveReligion = (index: number) => {
        const updatedReligions = [...listReligions];
        const [removedReligion] = updatedReligions.splice(index, 1);
        setter(updatedReligions);
        setAvailableReligions((prev) => [...prev, removedReligion.god].sort());
    };

    return (
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Religions</h1>

            <div className="space-y-4">
                {listReligions.map((god, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <select
                            value={god.god}
                            onChange={(e) => handleReligionChange(index, e.target.value)}
                            className="border border-gray-300 rounded-lg px-2 py-1"
                            disabled={disabled}
                        >
                            <option value={god.god}>{god.god}</option>
                            {availableReligions.map((availableReligion) => (
                                <option key={availableReligion} value={availableReligion}>
                                    {availableReligion}
                                </option>
                            ))}
                        </select>

                        <input
                            type="number"
                            value={god.devotion}
                            onChange={(e) => handleDevotionChange(index, Number(e.target.value))}
                            className="border border-gray-300 rounded-lg px-2 py-1 w-20"
                            placeholder="Devotion"
                        />

                        {!disabled && (
                            <button
                                onClick={() => handleRemoveReligion(index)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>
            
            {!disabled && (
                <button
                    onClick={handleAddReligion}
                    className="bg-light_foret hover:bg-foret text-white py-2 px-4 rounded mt-4"
                    disabled={availableReligions.length === 0}
                >
                    Ajouter une religion
                </button>
            )}
        </div>
    );
};

export default ReligionForm;
