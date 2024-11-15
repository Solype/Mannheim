import { MeleeWeapons } from '@/types/types';

export const MeleeForm = ({ melee, setMelee }: { melee: MeleeWeapons, setMelee: (c: MeleeWeapons) => void }) => {
    return (
        <div>
            <h3>Corps à corps</h3>
            <label>Arme d'hast</label>
            <input type="number" value={melee.polearm} onChange={(e) => setMelee({ ...melee, polearm: Number(e.target.value) } )} />

            <label>Arme exotique</label>
            <input type="number" value={melee.exoticWeapon} onChange={(e) => setMelee({ ...melee, exoticWeapon: Number(e.target.value) })} />

            <label>Contondante</label>
            <input type="number" value={melee.blunt} onChange={(e) => setMelee({ ...melee, blunt: Number(e.target.value) })} />

            <label>Courte lame</label>
            <input type="number" value={melee.shortBlade} onChange={(e) => setMelee({ ...melee, shortBlade: Number(e.target.value) })} />

            <label>Epée</label>
            <input type="number" value={melee.sword} onChange={(e) => setMelee({ ...melee, sword: Number(e.target.value) })} />

            <label>Hâche</label>
            <input type="number" value={melee.axe} onChange={(e) => setMelee({ ...melee, axe: Number(e.target.value) })} />

            <label>Sabre</label>
            <input type="number" value={melee.saber} onChange={(e) => setMelee({ ...melee, saber: Number(e.target.value) })} />

            <label>Main nue</label>
            <input type="number" value={melee.bareHands} onChange={(e) => setMelee({ ...melee, bareHands: Number(e.target.value) })} />
        </div>
    );
};
