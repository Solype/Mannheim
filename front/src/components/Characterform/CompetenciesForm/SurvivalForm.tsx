import { Survival } from '@/types/types';

export const SurvivalForm = ({ survival, setSurvival }: { survival: Survival, setSurvival: (c: Survival) => void }) => {
    return (
        <div>
            <h3>Survie</h3>
            <label>Crochetage</label>
            <input type="number" value={survival.lockpicking} onChange={(e) => setSurvival({ ...survival, lockpicking: Number(e.target.value) } )} />

            <label>Discrétion</label>
            <input type="number" value={survival.stealth} onChange={(e) => setSurvival({ ...survival, stealth: Number(e.target.value) })} />

            <label>Manipulation</label>
            <input type="number" value={survival.manipulation} onChange={(e) => setSurvival({ ...survival, manipulation: Number(e.target.value) })} />

            <label>Orientation</label>
            <input type="number" value={survival.orientalKnowledge} onChange={(e) => setSurvival({ ...survival, orientalKnowledge: Number(e.target.value) })} />

            <label>Pêche</label>
            <input type="number" value={survival.fishing} onChange={(e) => setSurvival({ ...survival, fishing: Number(e.target.value) })} />

            <label>Pistage</label>
            <input type="number" value={survival.tracking} onChange={(e) => setSurvival({ ...survival, tracking: Number(e.target.value) })} />

            <label>Réflexe</label>
            <input type="number" value={survival.reflex} onChange={(e) => setSurvival({ ...survival, reflex: Number(e.target.value) })} />

            <label>Soulèvement</label>
            <input type="number" value={survival.lifting} onChange={(e) => setSurvival({ ...survival, lifting: Number(e.target.value) })} />
        </div>
    );
};
