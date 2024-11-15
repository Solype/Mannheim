import { RangedWeapons } from '@/types/types';

export const RangedForm = ({ ranged, setRanged }: { ranged: RangedWeapons, setRanged: (c: RangedWeapons) => void }) => {
    return (
        <div>
            <h3>A distance</h3>
            <label>Arc</label>
            <input type="number" value={ranged.bow} onChange={(e) => setRanged({ ...ranged, bow: Number(e.target.value) } )} />

            <label>Arbalète</label>
            <input type="number" value={ranged.crossbow} onChange={(e) => setRanged({ ...ranged, crossbow: Number(e.target.value) })} />

            <label>Arme exotique</label>
            <input type="number" value={ranged.exoticWeapon} onChange={(e) => setRanged({ ...ranged, exoticWeapon: Number(e.target.value) })} />

            <label>Petit Projectile</label>
            <input type="number" value={ranged.smallProjectile} onChange={(e) => setRanged({ ...ranged, smallProjectile: Number(e.target.value) })} />

            <label>Pistolet</label>
            <input type="number" value={ranged.pistol} onChange={(e) => setRanged({ ...ranged, pistol: Number(e.target.value) })} />
        </div>
    );
};
