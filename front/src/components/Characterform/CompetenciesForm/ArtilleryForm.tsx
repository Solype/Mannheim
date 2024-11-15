import { Artillery } from '@/types/types';

export const ArtilleryForm = ({ artillery, setArtillery }: { artillery: Artillery, setArtillery: (c: Artillery) => void }) => {
    return (
        <div>
            <h3>Artillerie</h3>
            <label>Canon</label>
            <input type="number" value={artillery.cannon} onChange={(e) => setArtillery({ ...artillery, cannon: Number(e.target.value) } )} />

            <label>Engin</label>
            <input type="number" value={artillery.engine} onChange={(e) => setArtillery({ ...artillery, engine: Number(e.target.value) })} />
        </div>
    );
};
