import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RangedWeapons } from '@/types/types';

export const RangedForm = ({ ranged, setRanged }: { ranged: RangedWeapons, setRanged: (c: RangedWeapons) => void }) => {
    return (
        <div>
            <h3>A distance</h3>
            <Label>Arc</Label>
            <Input type="number" value={ranged.bow} onChange={(e) => setRanged({ ...ranged, bow: Number(e.target.value) } )} />

            <Label>Arbalète</Label>
            <Input type="number" value={ranged.crossbow} onChange={(e) => setRanged({ ...ranged, crossbow: Number(e.target.value) })} />

            <Label>Arme exotique</Label>
            <Input type="number" value={ranged.exoticWeapon} onChange={(e) => setRanged({ ...ranged, exoticWeapon: Number(e.target.value) })} />

            <Label>Petit Projectile</Label>
            <Input type="number" value={ranged.smallProjectile} onChange={(e) => setRanged({ ...ranged, smallProjectile: Number(e.target.value) })} />

            <Label>Pistolet</Label>
            <Input type="number" value={ranged.pistol} onChange={(e) => setRanged({ ...ranged, pistol: Number(e.target.value) })} />
        </div>
    );
};
