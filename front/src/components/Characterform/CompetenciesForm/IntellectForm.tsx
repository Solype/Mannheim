import { Intellect } from '@/types/types';
import { KnowledgeForm } from './KnowledgeForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const IntellectForm = ({ intellect, setIntellect }: { intellect: Intellect, setIntellect: (c: Intellect) => void }) => {
    return (
        <div>
            <h3>Intellect</h3>

            <KnowledgeForm knowledge={intellect.knowledge} setKnowledge={(a) => setIntellect({ ...intellect, knowledge: a })} />

            <Label>Concentration</Label>
            <Input type="number" value={intellect.concentration} onChange={(e) => setIntellect({ ...intellect, concentration: Number(e.target.value) } )} />

            <Label>Déduction</Label>
            <Input type="number" value={intellect.deduction} onChange={(e) => setIntellect({ ...intellect, deduction: Number(e.target.value) })} />

            <Label>Mémoire</Label>
            <Input type="number" value={intellect.memory} onChange={(e) => setIntellect({ ...intellect, memory: Number(e.target.value) })} />

            <Label>Observation</Label>
            <Input type="number" value={intellect.observation} onChange={(e) => setIntellect({ ...intellect, observation: Number(e.target.value) })} />
        </div>
    );
};
