import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Magic } from '@/types/character_types';

export const MagicForm = ({ magic, setMagic }: { magic: Magic, setMagic: (c: Magic) => void }) => {
    return (
        <div>
            <h3>Magie</h3>
            <Label>Alchimie</Label>
            <Input type="number" value={magic.alchemy} onChange={(e) => setMagic({ ...magic, alchemy: Number(e.target.value) } )} />

            <Label>Amélioration</Label>
            <Input type="number" value={magic.enhancement} onChange={(e) => setMagic({ ...magic, enhancement: Number(e.target.value) })} />

            <Label>Annihilation</Label>
            <Input type="number" value={magic.annihilation} onChange={(e) => setMagic({ ...magic, annihilation: Number(e.target.value) })} />

            <Label>Conjuration</Label>
            <Input type="number" value={magic.conjuration} onChange={(e) => setMagic({ ...magic, conjuration: Number(e.target.value) })} />

            <Label>Elementarisme</Label>
            <Input type="number" value={magic.elementarism} onChange={(e) => setMagic({ ...magic, elementarism: Number(e.target.value) })} />

            <Label>Enchantement</Label>
            <Input type="number" value={magic.enchantment} onChange={(e) => setMagic({ ...magic, enchantment: Number(e.target.value) })} />

            <Label>Illusionnisme</Label>
            <Input type="number" value={magic.illusionism} onChange={(e) => setMagic({ ...magic, illusionism: Number(e.target.value) })} />

            <Label>Invocation</Label>
            <Input type="number" value={magic.summoning} onChange={(e) => setMagic({ ...magic, summoning: Number(e.target.value) })} />

            <Label>Nécromancie</Label>
            <Input type="number" value={magic.necromancy} onChange={(e) => setMagic({ ...magic, necromancy: Number(e.target.value) })} />

            <Label>Perception</Label>
            <Input type="number" value={magic.perception} onChange={(e) => setMagic({ ...magic, perception: Number(e.target.value) })} />

            <Label>Scellement</Label>
            <Input type="number" value={magic.sealing} onChange={(e) => setMagic({ ...magic, sealing: Number(e.target.value) })} />

            <Label>Sorcellerie</Label>
            <Input type="number" value={magic.witchcraft} onChange={(e) => setMagic({ ...magic, witchcraft: Number(e.target.value) })} />

            <Label>Absorption</Label>
            <Input type="number" value={magic.absorption} onChange={(e) => setMagic({ ...magic, absorption: Number(e.target.value) })} />
        </div>
    );
};
