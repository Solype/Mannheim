import { Resistance } from '@/types/types';

export const ResistanceForm = ({ resistance, setResistance }: { resistance: Resistance, setResistance: (c: Resistance) => void }) => {
    return (
        <div>
            <h3>Résistance</h3>
            <label>Endurance</label>
            <input type="number" value={resistance.endurance} onChange={(e) => setResistance({ ...resistance, endurance: Number(e.target.value) } )} />

            <label>Mentale</label>
            <input type="number" value={resistance.mental} onChange={(e) => setResistance({ ...resistance, mental: Number(e.target.value) })} />

            <label>Pathologique</label>
            <input type="number" value={resistance.pathological} onChange={(e) => setResistance({ ...resistance, pathological: Number(e.target.value) })} />

            <label>Physique</label>
            <input type="number" value={resistance.physical} onChange={(e) => setResistance({ ...resistance, physical: Number(e.target.value) })} />
        </div>
    );
};
