import { Religion } from '@/types/types';

export const ReligionForm = ({ religions, setReligions }: { religions: Religion[], setReligions: (r: Religion[]) => void }) => {
    const handleReligionChange = (index: number, field: string, value: string | number) => {
        const updatedReligions = [...religions];
        updatedReligions[index] = { ...updatedReligions[index], [field]: value };
        setReligions(updatedReligions);
    };

    return (
        <div>
            <h2>Religions</h2>
            {religions.map((religion, index) => (
                <div key={index}>
                    <label>God</label>
                    <input type="text" value={religion.god} onChange={(e) => handleReligionChange(index, 'god', e.target.value)} />
                    
                    <label>Devotion</label>
                    <input type="number" value={religion.devotion} onChange={(e) => handleReligionChange(index, 'devotion', Number(e.target.value))} />
                </div>
            ))}
        </div>
    );
};
