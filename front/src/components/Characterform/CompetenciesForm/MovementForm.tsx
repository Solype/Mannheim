import { Movement } from '@/types/types';

export const MovementForm = ({ movement, setMovement }: { movement: Movement, setMovement: (c: Movement) => void }) => {
    return (
        <div>
            <h3>Déplacement</h3>
            <label>Acrobatie</label>
            <input type="number" value={movement.acrobatics} onChange={(e) => setMovement({ ...movement, acrobatics: Number(e.target.value) })} />

            <label>Course</label>
            <input type="number" value={movement.running} onChange={(e) => setMovement({ ...movement, running: Number(e.target.value) })} />

            <label>Equilibre</label>
            <input type="number" value={movement.balance} onChange={(e) => setMovement({ ...movement, balance: Number(e.target.value) })} />

            <label>Equitation</label>
            <input type="number" value={movement.riding} onChange={(e) => setMovement({ ...movement, riding: Number(e.target.value) })} />

            <label>Escalade</label>
            <input type="number" value={movement.climbing} onChange={(e) => setMovement({ ...movement, climbing: Number(e.target.value) })} />

            <label>Esquive</label>
            <input type="number" value={movement.dodging} onChange={(e) => setMovement({ ...movement, dodging: Number(e.target.value) })} />

            <label>Nage</label>
            <input type="number" value={movement.swimming} onChange={(e) => setMovement({ ...movement, swimming: Number(e.target.value) })} />

            <label>Navigation</label>
            <input type="number" value={movement.navigation} onChange={(e) => setMovement({ ...movement, navigation: Number(e.target.value) })} />

            <label>Réception</label>
            <input type="number" value={movement.landing} onChange={(e) => setMovement({ ...movement, landing: Number(e.target.value) })} />

            <label>Saut</label>
            <input type="number" value={movement.jumping} onChange={(e) => setMovement({ ...movement, jumping: Number(e.target.value) })} />
        </div>
    );
};
