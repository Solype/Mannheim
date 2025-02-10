import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MeleeWeapons } from '@/types/character_types';

export const MeleeForm = ({ melee, setMelee }: { melee: MeleeWeapons, setMelee: (c: MeleeWeapons) => void }) => {
    return (
        <div>
            <h3>Corps à corps</h3>
            <Label>Arme d'hast</Label>
            <Input type="number" value={melee.polearm} onChange={(e) => setMelee({ ...melee, polearm: Number(e.target.value) } )} />

            <Label>Arme exotique</Label>
            <Input type="number" value={melee.exoticWeapon} onChange={(e) => setMelee({ ...melee, exoticWeapon: Number(e.target.value) })} />

            <Label>Contondante</Label>
            <Input type="number" value={melee.blunt} onChange={(e) => setMelee({ ...melee, blunt: Number(e.target.value) })} />

            <Label>Courte lame</Label>
            <Input type="number" value={melee.shortBlade} onChange={(e) => setMelee({ ...melee, shortBlade: Number(e.target.value) })} />

            <Label>Epée</Label>
            <Input type="number" value={melee.sword} onChange={(e) => setMelee({ ...melee, sword: Number(e.target.value) })} />

            <Label>Hâche</Label>
            <Input type="number" value={melee.axe} onChange={(e) => setMelee({ ...melee, axe: Number(e.target.value) })} />

            <Label>Sabre</Label>
            <Input type="number" value={melee.saber} onChange={(e) => setMelee({ ...melee, saber: Number(e.target.value) })} />

            <Label>Main nue</Label>
            <Input type="number" value={melee.bareHands} onChange={(e) => setMelee({ ...melee, bareHands: Number(e.target.value) })} />
        </div>
    );
};
