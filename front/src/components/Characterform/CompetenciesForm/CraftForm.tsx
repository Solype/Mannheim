import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Craft } from '@/types/types';

export const CraftForm = ({ craft, setCraft }: { craft: Craft, setCraft: (c: Craft) => void }) => {
    return (
        <div>
            <h3>Artisanat</h3>
            <Label>Art Plastique</Label>
            <Input type="number" value={craft.visualArts} onChange={(e) => setCraft({ ...craft, visualArts: Number(e.target.value) } )} />

            <Label>Chimie</Label>
            <Input type="number" value={craft.chemistry} onChange={(e) => setCraft({ ...craft, chemistry: Number(e.target.value) })} />

            <Label>Construction</Label>
            <Input type="number" value={craft.construction} onChange={(e) => setCraft({ ...craft, construction: Number(e.target.value) })} />

            <Label>Cuisine</Label>
            <Input type="number" value={craft.cooking} onChange={(e) => setCraft({ ...craft, cooking: Number(e.target.value) })} />

            <Label>Explosif</Label>
            <Input type="number" value={craft.explosives} onChange={(e) => setCraft({ ...craft, explosives: Number(e.target.value) })} />

            <Label>Forge</Label>
            <Input type="number" value={craft.forging} onChange={(e) => setCraft({ ...craft, forging: Number(e.target.value) })} />

            <Label>Médecine</Label>
            <Input type="number" value={craft.medicine} onChange={(e) => setCraft({ ...craft, medicine: Number(e.target.value) })} />

            <Label>Musique</Label>
            <Input type="number" value={craft.music} onChange={(e) => setCraft({ ...craft, music: Number(e.target.value) })} />
        </div>
    );
};
