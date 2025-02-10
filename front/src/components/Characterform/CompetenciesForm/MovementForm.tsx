import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Movement } from '@/types/character_types';

export const MovementForm = ({ movement, setMovement }: { movement: Movement, setMovement: (c: Movement) => void }) => {
    return (
        <div>
            <h3>Déplacement</h3>
            <Label>Acrobatie</Label>
            <Input type="number" value={movement.acrobatics} onChange={(e) => setMovement({ ...movement, acrobatics: Number(e.target.value) })} />

            <Label>Course</Label>
            <Input type="number" value={movement.running} onChange={(e) => setMovement({ ...movement, running: Number(e.target.value) })} />

            <Label>Equilibre</Label>
            <Input type="number" value={movement.balance} onChange={(e) => setMovement({ ...movement, balance: Number(e.target.value) })} />

            <Label>Equitation</Label>
            <Input type="number" value={movement.riding} onChange={(e) => setMovement({ ...movement, riding: Number(e.target.value) })} />

            <Label>Escalade</Label>
            <Input type="number" value={movement.climbing} onChange={(e) => setMovement({ ...movement, climbing: Number(e.target.value) })} />

            <Label>Esquive</Label>
            <Input type="number" value={movement.dodging} onChange={(e) => setMovement({ ...movement, dodging: Number(e.target.value) })} />

            <Label>Nage</Label>
            <Input type="number" value={movement.swimming} onChange={(e) => setMovement({ ...movement, swimming: Number(e.target.value) })} />

            <Label>Navigation</Label>
            <Input type="number" value={movement.navigation} onChange={(e) => setMovement({ ...movement, navigation: Number(e.target.value) })} />

            <Label>Réception</Label>
            <Input type="number" value={movement.landing} onChange={(e) => setMovement({ ...movement, landing: Number(e.target.value) })} />

            <Label>Saut</Label>
            <Input type="number" value={movement.jumping} onChange={(e) => setMovement({ ...movement, jumping: Number(e.target.value) })} />
        </div>
    );
};
