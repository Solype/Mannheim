import { useState } from 'react';
import { AttributesForm } from '@/components/Characterform/AttributesForm';
import { CompetenciesForm } from '@/components/Characterform/CompetenciesForm';
import { InventoryForm } from '@/components/Characterform/InventoryForm';
import { ReligionForm } from '@/components/Characterform/ReligionForm';
import { CharacterForm, Attributes, Competencies, Inventory, Religion } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SimpleField } from '@/components/SimpleField';
import { dico } from '@/types/dico';

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
            envoutement: 0,
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


const SubForm = ({key, subKey, elem, handleChange} : {key: any, subKey: any, elem: any, handleChange: any}) => {
    return (
        typeof elem === 'object' && !Array.isArray(elem) ? (
            <div className='rounded flex flex-col gap-5'>
                <h1 className='text-3xl font-bold'>{dico[subKey]}</h1>
                <div className='grid grid-cols-4 gap-5'>
                    {Object.keys(elem).map((subSubKey) => (
                        <SimpleField
                            key={subSubKey}
                            label={dico[subSubKey]}
                            type="number"
                            value={elem[subSubKey]}
                            onChange={(e) => handleChange(e, [key, subKey, subSubKey])}
                        />
                    ))}
                </div>
            </div>
        ) : (
            <SimpleField
                key={subKey}
                label={dico[subKey]}
                type={typeof elem === 'number' ? 'number' : 'text'}
                value={elem}
                onChange={(e) => handleChange(e, [key, subKey])}
            />
        )
    )
}


// const SkillForm = ({skill_list} : {skill_list: Competencies}) => {
//     return (
//         Object.keys(skill_list).map((subKey) => {
//             typeof skill_list[subKey]
//         })
//     )
// }


const CharactersPage = () => {
    const [formState, setFormState] = useState<CharacterForm>(initialFormState);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, keys: string[]) => {
        const newState = { ...formState };
        let current = newState;

        keys.slice(0, -1).forEach((key) => {
            current = current[key];
        });

        current[keys[keys.length - 1]] = typeof current[keys[keys.length - 1]] === 'number'
            ? Number(e.target.value)
            : e.target.value;

        setFormState(newState);
    };

    return (
        <div className='bg-slate-500 items-center flex flex-col gap-10 pt-10'>
            <h1 className='text-3xl font-bold'>Create Character</h1>
            <form className='flex flex-col w-2/3'>
                {Object.keys(formState).map((key) => (
                    <>
                    <p>{key}</p>

                    {typeof formState[key] === 'object' && !Array.isArray(formState[key]) ? (
                        <div className=''>
                            <h1 className='text-3xl font-bold'>{dico[key]}</h1>
                            <div className=''>
                                {Object.keys(formState[key]).map((subKey) => (
                                    <SubForm key={key} subKey={subKey} elem={formState[key][subKey]} handleChange={handleChange}/>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <SimpleField
                            key={key}
                            label={dico[key]}
                            type={typeof formState[key] === 'number' ? 'number' : 'text'}
                            value={formState[key]}
                            onChange={(e) => handleChange(e, [key])}
                        />
                    )}
                    </>))}
            </form>
        </div>
    );
};

export default CharactersPage;
