import { Attributes } from '@/types/types';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export const AttributesForm = ({ attributes, setAttributes }: { attributes: Attributes, setAttributes: (a: Attributes) => void }) => {

    return (
        <div>
            <h2>Attributs</h2>
            <div className='grid grid-cols-6'>
            {
                Object.keys(attributes).map((key) => (
                    <div key={key}>
                        <Label>{key}</Label>
                        <Input
                            type="number"
                            value={attributes[key]}
                            onChange={(e) => setAttributes({ ...attributes, [key]: Number(e.target.value) })}
                        />
                    </div>
                ))
            }

                {/* <div>
                    <Label>Résistance</Label>
                    <Input type="number" value={attributes["resistancy"]} onChange={(e) => setAttributes({ ...attributes, resistancy: Number(e.target.value) })} />
                </div>
                <div>
                    <Label>Force</Label>
                    <Input type="number" value={attributes.strength} onChange={(e) => setAttributes({ ...attributes, strength: Number(e.target.value) })} />
                </div>
                <div>
                    <Label>Agilité</Label>
                    <Input type="number" value={attributes.agility} onChange={(e) => setAttributes({ ...attributes, agility: Number(e.target.value) })} />
                </div>
                <div>
                    <Label>Dextérité</Label>
                    <Input type="number" value={attributes.dexterity} onChange={(e) => setAttributes({ ...attributes, dexterity: Number(e.target.value) })} />
                </div>
                <div>
                    <Label>Vivacité</Label>
                    <Input type="number" value={attributes.vivacity} onChange={(e) => setAttributes({ ...attributes, vivacity: Number(e.target.value) })} />
                </div>
                <div>
                    <Label>Intellect</Label>
                    <Input type="number" value={attributes.intelligence} onChange={(e) => setAttributes({ ...attributes, intelligence: Number(e.target.value) })} />
                </div>
                <div>
                    <Label>Social</Label>
                    <Input type="number" value={attributes.sociality} onChange={(e) => setAttributes({ ...attributes, sociality: Number(e.target.value) })} />
                </div> */}
            </div>
        </div>
    );
};
