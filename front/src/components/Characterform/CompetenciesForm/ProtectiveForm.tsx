import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Protective } from '@/types/types';

export const ProtectiveForm = ({ protective, setProtective }: { protective: Protective, setProtective: (c: Protective) => void }) => {
    return (
        <div>
            <h3>Protectrice</h3>
            <Label>Bouclier</Label>
            <Input type="number" value={protective.shield} onChange={(e) => setProtective({ ...protective, shield: Number(e.target.value) })} />
        </div>
    );
};
