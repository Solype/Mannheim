import { Intellect } from '@/types/types';
import { KnowledgeForm } from './KnowledgeForm';

export const IntellectForm = ({ intellect, setIntellect }: { intellect: Intellect, setIntellect: (c: Intellect) => void }) => {
    return (
        <div>
            <h3>Intellect</h3>

            <KnowledgeForm knowledge={intellect.knowledge} setKnowledge={(a) => setIntellect({ ...intellect, knowledge: a })} />

            <label>Concentration</label>
            <input type="number" value={intellect.concentration} onChange={(e) => setIntellect({ ...intellect, concentration: Number(e.target.value) } )} />

            <label>Déduction</label>
            <input type="number" value={intellect.deduction} onChange={(e) => setIntellect({ ...intellect, deduction: Number(e.target.value) })} />

            <label>Mémoire</label>
            <input type="number" value={intellect.memory} onChange={(e) => setIntellect({ ...intellect, memory: Number(e.target.value) })} />

            <label>Observation</label>
            <input type="number" value={intellect.observation} onChange={(e) => setIntellect({ ...intellect, observation: Number(e.target.value) })} />
        </div>
    );
};
