import { Attributes } from '@/types/types';

export const AttributesForm = ({ attributes, setAttributes }: { attributes: Attributes, setAttributes: (a: Attributes) => void }) => {
    return (
        <div>
            <h2>Attributs</h2>
            <label>Résistance</label>
            <input type="number" value={attributes.resistancy} onChange={(e) => setAttributes({ ...attributes, resistancy: Number(e.target.value) })} />

            <label>Force</label>
            <input type="number" value={attributes.strength} onChange={(e) => setAttributes({ ...attributes, strength: Number(e.target.value) })} />

            <label>Agilité</label>
            <input type="number" value={attributes.agility} onChange={(e) => setAttributes({ ...attributes, agility: Number(e.target.value) })} />

            <label>Dextérité</label>
            <input type="number" value={attributes.dexterity} onChange={(e) => setAttributes({ ...attributes, dexterity: Number(e.target.value) })} />

            <label>Vivacité</label>
            <input type="number" value={attributes.vivacity} onChange={(e) => setAttributes({ ...attributes, vivacity: Number(e.target.value) })} />

            <label>Intellect</label>
            <input type="number" value={attributes.intelligence} onChange={(e) => setAttributes({ ...attributes, intelligence: Number(e.target.value) })} />

            <label>Social</label>
            <input type="number" value={attributes.sociality} onChange={(e) => setAttributes({ ...attributes, sociality: Number(e.target.value) })} />
        </div>
    );
};
