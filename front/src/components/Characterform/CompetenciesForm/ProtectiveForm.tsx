import { Protective } from '@/types/types';

export const ProtectiveForm = ({ protective, setProtective }: { protective: Protective, setProtective: (c: Protective) => void }) => {
    return (
        <div>
            <h3>Protectrice</h3>
            <label>Bouclier</label>
            <input type="number" value={protective.shield} onChange={(e) => setProtective({ ...protective, shield: Number(e.target.value) })} />
        </div>
    );
};
