import { Craft } from '@/types/types';

export const CraftForm = ({ craft, setCraft }: { craft: Craft, setCraft: (c: Craft) => void }) => {
    return (
        <div>
            <h3>Artisanat</h3>
            <label>Art Plastique</label>
            <input type="number" value={craft.visualArts} onChange={(e) => setCraft({ ...craft, visualArts: Number(e.target.value) } )} />

            <label>Chimie</label>
            <input type="number" value={craft.chemistry} onChange={(e) => setCraft({ ...craft, chemistry: Number(e.target.value) })} />

            <label>Construction</label>
            <input type="number" value={craft.construction} onChange={(e) => setCraft({ ...craft, construction: Number(e.target.value) })} />

            <label>Cuisine</label>
            <input type="number" value={craft.cooking} onChange={(e) => setCraft({ ...craft, cooking: Number(e.target.value) })} />

            <label>Explosif</label>
            <input type="number" value={craft.explosives} onChange={(e) => setCraft({ ...craft, explosives: Number(e.target.value) })} />

            <label>Forge</label>
            <input type="number" value={craft.forging} onChange={(e) => setCraft({ ...craft, forging: Number(e.target.value) })} />

            <label>Médecine</label>
            <input type="number" value={craft.medicine} onChange={(e) => setCraft({ ...craft, medicine: Number(e.target.value) })} />

            <label>Musique</label>
            <input type="number" value={craft.music} onChange={(e) => setCraft({ ...craft, music: Number(e.target.value) })} />
        </div>
    );
};
