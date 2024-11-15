import { Knowledge } from '@/types/types';

export const KnowledgeForm = ({ knowledge, setKnowledge }: { knowledge: Knowledge, setKnowledge: (c: Knowledge) => void }) => {
    return (
        <div>
            <h3>Connaissance</h3>

            <label>Anatomique</label>
            <input type="number" value={knowledge.anatomy} onChange={(e) => setKnowledge({ ...knowledge, anatomy: Number(e.target.value) } )} />

            <label>Artistique</label>
            <input type="number" value={knowledge.artistic} onChange={(e) => setKnowledge({ ...knowledge, artistic: Number(e.target.value) })} />

            <label>Astronomique</label>
            <input type="number" value={knowledge.astronomy} onChange={(e) => setKnowledge({ ...knowledge, astronomy: Number(e.target.value) })} />

            <label>Biologique</label>
            <input type="number" value={knowledge.biology} onChange={(e) => setKnowledge({ ...knowledge, biology: Number(e.target.value) })} />

            <label>Culturel</label>
            <input type="number" value={knowledge.cultural} onChange={(e) => setKnowledge({ ...knowledge, cultural: Number(e.target.value) })} />

            <label>Géographique</label>
            <input type="number" value={knowledge.geography} onChange={(e) => setKnowledge({ ...knowledge, geography: Number(e.target.value) })} />

            <label>Guerrière</label>
            <input type="number" value={knowledge.warfare} onChange={(e) => setKnowledge({ ...knowledge, warfare: Number(e.target.value) })} />

            <label>Historique</label>
            <input type="number" value={knowledge.history} onChange={(e) => setKnowledge({ ...knowledge, history: Number(e.target.value) })} />

            <label>Linguistique</label>
            <input type="number" value={knowledge.linguistics} onChange={(e) => setKnowledge({ ...knowledge, linguistics: Number(e.target.value) })} />

            <label>Magique</label>
            <input type="number" value={knowledge.magic} onChange={(e) => setKnowledge({ ...knowledge, magic: Number(e.target.value) })} />

            <label>Mystique</label>
            <input type="number" value={knowledge.mysticism} onChange={(e) => setKnowledge({ ...knowledge, mysticism: Number(e.target.value) })} />

            <label>Technologique</label>
            <input type="number" value={knowledge.technology} onChange={(e) => setKnowledge({ ...knowledge, technology: Number(e.target.value) })} />
        </div>
    );
};
