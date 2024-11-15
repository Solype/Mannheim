import { Magic } from '@/types/types';

export const MagicForm = ({ magic, setMagic }: { magic: Magic, setMagic: (c: Magic) => void }) => {
    return (
        <div>
            <h3>Magie</h3>
            <label>Alchimie</label>
            <input type="number" value={magic.alchemy} onChange={(e) => setMagic({ ...magic, alchemy: Number(e.target.value) } )} />

            <label>Amélioration</label>
            <input type="number" value={magic.enhancement} onChange={(e) => setMagic({ ...magic, enhancement: Number(e.target.value) })} />

            <label>Annihilation</label>
            <input type="number" value={magic.annihilation} onChange={(e) => setMagic({ ...magic, annihilation: Number(e.target.value) })} />

            <label>Conjuration</label>
            <input type="number" value={magic.conjuration} onChange={(e) => setMagic({ ...magic, conjuration: Number(e.target.value) })} />

            <label>Elementarisme</label>
            <input type="number" value={magic.elementarism} onChange={(e) => setMagic({ ...magic, elementarism: Number(e.target.value) })} />

            <label>Enchantement</label>
            <input type="number" value={magic.enchantment} onChange={(e) => setMagic({ ...magic, enchantment: Number(e.target.value) })} />

            <label>Illusionnisme</label>
            <input type="number" value={magic.illusionism} onChange={(e) => setMagic({ ...magic, illusionism: Number(e.target.value) })} />

            <label>Invocation</label>
            <input type="number" value={magic.summoning} onChange={(e) => setMagic({ ...magic, summoning: Number(e.target.value) })} />

            <label>Nécromancie</label>
            <input type="number" value={magic.necromancy} onChange={(e) => setMagic({ ...magic, necromancy: Number(e.target.value) })} />

            <label>Perception</label>
            <input type="number" value={magic.perception} onChange={(e) => setMagic({ ...magic, perception: Number(e.target.value) })} />

            <label>Scellement</label>
            <input type="number" value={magic.sealing} onChange={(e) => setMagic({ ...magic, sealing: Number(e.target.value) })} />

            <label>Sorcellerie</label>
            <input type="number" value={magic.witchcraft} onChange={(e) => setMagic({ ...magic, witchcraft: Number(e.target.value) })} />

            <label>Absorption</label>
            <input type="number" value={magic.absorption} onChange={(e) => setMagic({ ...magic, absorption: Number(e.target.value) })} />
        </div>
    );
};
