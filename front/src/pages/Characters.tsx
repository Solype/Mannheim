import { useState } from 'react';
import { AttributesForm } from '@/components/Characterform/AttributesForm';
import { CompetenciesForm } from '@/components/Characterform/CompetenciesForm';
import { InventoryForm } from '@/components/Characterform/InventoryForm';
import { ReligionForm } from '@/components/Characterform/ReligionForm';
import { CharacterForm, Attributes, Competencies, Inventory, Religion } from '@/types/types';
import { Label } from '@radix-ui/react-label';

const initialFormState: CharacterForm = {
    name: "",
    species: "",
    age: 0,
    priority: "",
    attributes: {
        resistancy: 0,
        strength: 0,
        agility: 0,
        dexterity: 0,
        vivacity: 0,
        intelligence: 0,
        sociality: 0
    },
    role: "",
    competencies: {
        ranged: {
            bow: 0,
            crossbow: 0,
            exoticWeapon: 0,
            smallProjectile: 0,
            pistol: 0
        },
        artillery: {
            cannon: 0,
            engine: 0
        },
        melee: {
            polearm: 0,
            exoticWeapon: 0,
            blunt: 0,
            shortBlade: 0,
            sword: 0,
            axe: 0,
            saber: 0,
            bareHands: 0
        },
        protective: {
            shield: 0
        },
        movement: {
            acrobatics: 0,
            running: 0,
            balance: 0,
            riding: 0,
            climbing: 0,
            dodging: 0,
            swimming: 0,
            navigation: 0,
            landing: 0,
            jumping: 0
        },
        resistance: {
            endurance: 0,
            mental: 0,
            pathological: 0,
            physical: 0
        },
        survival: {
            lockpicking: 0,
            stealth: 0,
            manipulation: 0,
            orientalKnowledge: 0,
            fishing: 0,
            tracking: 0,
            reflex: 0,
            lifting: 0
        },
        social: {
            taming: 0,
            deceit: 0,
            intimidation: 0,
            speech: 0,
            persuasion: 0,
            psychology: 0
        },
        intellect: {
            knowledge: {
                anatomy: 0,
                artistic: 0,
                astronomy: 0,
                biology: 0,
                cultural: 0,
                geography: 0,
                warfare: 0,
                history: 0,
                linguistics: 0,
                magic: 0,
                mysticism: 0,
                technology: 0
            },
            concentration: 0,
            deduction: 0,
            memory: 0,
            observation: 0
        },
        craft: {
            visualArts: 0,
            chemistry: 0,
            construction: 0,
            cooking: 0,
            explosives: 0,
            forging: 0,
            medicine: 0,
            music: 0
        },
        magic: {
            alchemy: 0,
            enhancement: 0,
            annihilation: 0,
            conjuration: 0,
            elementarism: 0,
            enchantment: 0,
            illusionism: 0,
            summoning: 0,
            necromancy: 0,
            perception: 0,
            sealing: 0,
            witchcraft: 0,
            absorption: 0
        }
    },
    mana: 0,
    languages: [],
    totemAnimals: [],
    religions: [
        {
            god: "",
            devotion: 0
        }
    ],
    animals: [],
    inventory: {
        weight: 0,
        contents: []
    },
    currency: 0
}

const CharactersPage = () => {
    const [formState, setFormState] = useState<CharacterForm>(initialFormState);

    const setAttributes = (attributes: Attributes) => {
        setFormState({ ...formState, attributes });
    };

    const setCompetencies = (competencies: Competencies) => {
        setFormState({ ...formState, competencies });
    };

    const setInventory = (inventory: Inventory) => {
        setFormState({ ...formState, inventory });
    };

    const setReligions = (religions: Religion[]) => {
        setFormState({ ...formState, religions });
    };

    return (
        <div className='bg-slate-500'>
            <form>
                <h1>Create Character</h1>
                <div>
                    <label>Nom</label>
                    <input 
                        type="text" 
                        value={formState.name} 
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })} 
                    />

                    <label>Espèce</label>
                    <input 
                        type="text" 
                        value={formState.species} 
                        onChange={(e) => setFormState({ ...formState, species: e.target.value })} 
                    />

                    <label>Age</label>
                    <input 
                        type="number" 
                        value={formState.age} 
                        onChange={(e) => setFormState({ ...formState, age: Number(e.target.value) })} 
                    />
                    <label>Priorité</label>
                    <input 
                        type="number" 
                        value={formState.priority} 
                        onChange={(e) => setFormState({ ...formState, priority: e.target.value })} 
                    />
                </div>

                <AttributesForm 
                    attributes={formState.attributes} 
                    setAttributes={setAttributes} 
                />

                <Label>Role</Label>
                <input 
                    type="text" 
                    value={formState.role} 
                    onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                />

                <CompetenciesForm 
                    competencies={formState.competencies} 
                    setCompetencies={setCompetencies} 
                />

                <div>
                    <label>Mana</label>
                    <input 
                        type="number" 
                        value={formState.mana} 
                        onChange={(e) => setFormState({ ...formState, mana: Number(e.target.value) })} 
                    />

                    <label>Langues</label>
                    <input 
                        type="text" 
                        value={formState.languages.join(', ')} 
                        onChange={(e) => setFormState({ ...formState, languages: e.target.value.split(', ') })} 
                    />

                    <label>Animals Totems</label>
                    <input 
                        type="text" 
                        value={formState.totemAnimals.join(', ')} 
                        onChange={(e) => setFormState({ ...formState, totemAnimals: e.target.value.split(', ') })}
                    />

                    <ReligionForm 
                        religions={formState.religions} 
                        setReligions={setReligions} 
                    />

                    <label>Animals</label>
                    <input 
                        type="text" 
                        value={formState.animals.join(', ')} 
                        onChange={(e) => setFormState({ ...formState, animals: e.target.value.split(', ') })}
                    />
                </div>

                <InventoryForm 
                    inventory={formState.inventory} 
                    setInventory={setInventory} 
                />

                <label>Monnaie</label>
                <input 
                    type="number" 
                    value={formState.currency} 
                    onChange={(e) => setFormState({ ...formState, currency: Number(e.target.value) })} 
                />


                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CharactersPage;
