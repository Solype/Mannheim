import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Resistance } from '@/types/character_types';

export const ResistanceForm = ({ resistance, setResistance }: { resistance: Resistance, setResistance: (c: Resistance) => void }) => {
    return (
        <div>
            <h3>Résistance</h3>
            <Label>Endurance</Label>
            <Input type="number" value={resistance.endurance} onChange={(e) => setResistance({ ...resistance, endurance: Number(e.target.value) } )} />

            <Label>Mentale</Label>
            <Input type="number" value={resistance.mental} onChange={(e) => setResistance({ ...resistance, mental: Number(e.target.value) })} />

            <Label>Pathologique</Label>
            <Input type="number" value={resistance.pathological} onChange={(e) => setResistance({ ...resistance, pathological: Number(e.target.value) })} />

            <Label>Physique</Label>
            <Input type="number" value={resistance.physical} onChange={(e) => setResistance({ ...resistance, physical: Number(e.target.value) })} />
        </div>
    );
};
