import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Knowledge } from '@/types/character_types';

export const KnowledgeForm = ({ knowledge, setKnowledge }: { knowledge: Knowledge, setKnowledge: (c: Knowledge) => void }) => {
    return (
        <div>
            <h3>Connaissance</h3>

            <Label>Anatomique</Label>
            <Input type="number" value={knowledge.anatomy} onChange={(e) => setKnowledge({ ...knowledge, anatomy: Number(e.target.value) } )} />

            <Label>Artistique</Label>
            <Input type="number" value={knowledge.artistic} onChange={(e) => setKnowledge({ ...knowledge, artistic: Number(e.target.value) })} />

            <Label>Astronomique</Label>
            <Input type="number" value={knowledge.astronomy} onChange={(e) => setKnowledge({ ...knowledge, astronomy: Number(e.target.value) })} />

            <Label>Biologique</Label>
            <Input type="number" value={knowledge.biology} onChange={(e) => setKnowledge({ ...knowledge, biology: Number(e.target.value) })} />

            <Label>Culturel</Label>
            <Input type="number" value={knowledge.cultural} onChange={(e) => setKnowledge({ ...knowledge, cultural: Number(e.target.value) })} />

            <Label>Géographique</Label>
            <Input type="number" value={knowledge.geography} onChange={(e) => setKnowledge({ ...knowledge, geography: Number(e.target.value) })} />

            <Label>Guerrière</Label>
            <Input type="number" value={knowledge.warfare} onChange={(e) => setKnowledge({ ...knowledge, warfare: Number(e.target.value) })} />

            <Label>Historique</Label>
            <Input type="number" value={knowledge.history} onChange={(e) => setKnowledge({ ...knowledge, history: Number(e.target.value) })} />

            <Label>Linguistique</Label>
            <Input type="number" value={knowledge.linguistics} onChange={(e) => setKnowledge({ ...knowledge, linguistics: Number(e.target.value) })} />

            <Label>Magique</Label>
            <Input type="number" value={knowledge.magic} onChange={(e) => setKnowledge({ ...knowledge, magic: Number(e.target.value) })} />

            <Label>Mystique</Label>
            <Input type="number" value={knowledge.mysticism} onChange={(e) => setKnowledge({ ...knowledge, mysticism: Number(e.target.value) })} />

            <Label>Technologique</Label>
            <Input type="number" value={knowledge.technology} onChange={(e) => setKnowledge({ ...knowledge, technology: Number(e.target.value) })} />
        </div>
    );
};
