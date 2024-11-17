import { useEffect, useState } from 'react';
import CharacterModifiactionUtils from '@/services/CharacterModifiactionUtils';
// import { AttributesForm } from '@/components/Characterform/AttributesForm';
// import { CompetenciesForm } from '@/components/Characterform/CompetenciesForm';
// import { InventoryForm } from '@/components/Characterform/InventoryForm';
// import { ReligionForm } from '@/components/Characterform/ReligionForm';
// import { CharacterForm, Attributes, Competencies, Inventory, Religion } from '@/types/character_types';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { SimpleField } from '@/components/SimpleField';
// import { dico } from '@/types/dico';

// const initialFormState: CharacterForm = {
//     name: "",
//     species: "",
//     age: 0,
//     priority: "",
//     attributes: {
//         resistancy: 0,
//         strength: 0,
//         agility: 0,
//         dexterity: 0,
//         vivacity: 0,
//         intelligence: 0,
//         sociality: 0
//     },
//     role: "",
//     competencies: {
//     mana: 0,
//     languages: [],
//     totemAnimals: [],
//     religions: [
//         {
//             god: "",
//             devotion: 0
//         }
//     ],
//     animals: [],
//     inventory: {
//         weight: 0,
//         contents: []
//     },
//     currency: 0
// }


type Skill = {
    name: string;
    category: string;
    pureValue: number;
    roleValue: number;
};

type Gods = {
    name: string;
    devotion: number;
}


const listSkills = {
    ranged: [
        "bow",
        "crossbow",
        "exoticWeapon",
        "smallProjectile",
        "pistol"
    ],
    artillery: [
        "cannon",
        "engine"
    ],
    melee: [
        "polearm",
        "exoticWeapon",
        "blunt",
        "shortBlade",
        "sword",
        "axe",
        "saber",
        "bareHands"
    ],
    protective: [
        "shield"
    ],
    movement: [
        "acrobatics",
        "running",
        "balance",
        "riding",
        "climbing",
        "dodging",
        "swimming",
        "navigation",
        "landing",
        "jumping"
    ],
    resistance: [
        "endurance",
        "mental",
        "pathological",
        "physical"
    ],
    survival: [
        "lockpicking",
        "stealth",
        "manipulation",
        "orientalKnowledge",
        "fishing",
        "tracking",
        "reflex",
        "lifting"
    ],
    social: [
        "taming",
        "deceit",
        "intimidation",
        "speech",
        "persuasion",
        "psychology"
    ],
    intellect: [
        "anatomy_knowledge",
        "artistic_knowledge",
        "astronomy_knowledge",
        "biology_knowledge",
        "cultural_knowledge",
        "geography_knowledge",
        "warfare_knowledge",
        "history_knowledge",
        "linguistics_knowledge",
        "magic_knowledge",
        "mysticism_knowledge",
        "technology_knowledge",
        "concentration",
        "deduction",
        "memory",
        "observation"
    ],
    craft: [
        "visualArts",
        "chemistry",
        "construction",
        "cooking",
        "explosives",
        "forging",
        "medicine",
        "music"
    ],
    magic: [
        "alchemy",
        "enhancement",
        "annihilation",
        "conjuration",
        "elementarism",
        "envoutement",
        "enchantment",
        "illusionism",
        "summoning",
        "necromancy",
        "perception",
        "sealing",
        "witchcraft",
        "absorption"
    ]
}

function extractSkills(listSkills: Record<string, string[]>): Skill[] {
    const skills: Skill[] = [];
    
    for (const category in listSkills) {
        if (listSkills.hasOwnProperty(category)) {
            const skillNames = listSkills[category];
            skillNames.forEach(skillName => {
                skills.push({
                    name: skillName,
                    category,
                    pureValue: 0,
                    roleValue: 0
                });
            });
        }
    }
    
    return skills;
}

interface SingleSkillFormProps {
    skillName: string;
    skillValueSetter: (pure: number, role: number) => void;
}

const SingleSkillForm = ({ skillName, skillValueSetter }: SingleSkillFormProps) => {
    const [ pureValue, setPureValue ] = useState(0);
    const [ roleValue, setRoleValue ] = useState(0);

    const onPureValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPureValue(Number(e.target.value));
        skillValueSetter(pureValue, roleValue);
    };

    const onRoleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoleValue(Number(e.target.value));
        skillValueSetter(pureValue, roleValue);
    };

    return (
        <div className="flex items-center justify-between space-x-4 bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <p className="font-semibold text-gray-700 capitalize">{skillName}</p>
            <div className="flex items-center space-x-4">
                <div className="flex space-x-2 items-center">
                    <div className="flex flex-col items-center">
                        <label className="text-sm text-gray-500">Pure</label>
                        <input
                            type="number"
                            value={pureValue}
                            onChange={onPureValueChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="text-sm text-gray-500">Role</label>
                        <input
                            type="number"
                            value={roleValue}
                            onChange={onRoleValueChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                </div>
                <p className="text-xl font-bold text-gray-900 self-center">= {pureValue + roleValue}</p>
            </div>
        </div>
    )
}

interface SkillFormProps {
    skillSetter: (skillName: string, skillCategory: string, pureValue: number, roleValue: number) => void;
}

const SkillForm = ({ skillSetter }: SkillFormProps) => {
    return (
        <div className="space-y-8">
            {Object.entries(listSkills).map(([category, skills]) => (
                <div key={category} className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 capitalize">
                        {category}
                    </h1>
                    <div className="space-y-4">
                        {skills.map((skillName: string) => (
                            <SingleSkillForm
                                key={skillName}
                                skillName={skillName}
                                skillValueSetter={(pure: number, role: number) =>
                                    skillSetter(skillName, category, pure, role)
                                }
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};




const GodForm = () => {
    const [ godsList, setGodsList ] = useState<string[]>([]);

    useEffect(() => {
        CharacterModifiactionUtils.getGods().then(setGodsList);
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
                Gods
            </h1>
            <div className="space-y-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Add God
                </button>
            </div>
        </div>
    )
}


// const BasicCharacterForm = () => {
//     const [ characterName, setCharacterName ] = useState('');
// }


const CharactersPage = () => {
    const [ skills, setSkills ] = useState<Skill[]>(extractSkills(listSkills));

    const handleChangeSkill = (skillName: string, skillCategory: string, pureValue: number, roleValue: number) => {
        setSkills(skills.map((skill) => {
            if (skill.name === skillName && skill.category === skillCategory) {
                return { ...skill, pureValue, roleValue };
            }
            return skill;
        }));
        console.log(skills);
    }

    return (
        <div className="bg-slate-500 flex justify-between items-start pt-10 px-10">
            <div className="w-1/2 space-y-4">
                <h2 className="text-2xl font-semibold text-white">Objects / Info</h2>
                <p className="text-white">Put any objects or information here</p>
                <GodForm />
            </div>

            <div className="w-1/2">
                <h1 className="text-3xl font-bold text-white mb-6">Create Character</h1>
                <form className="flex flex-col space-y-4">
                    <SkillForm skillSetter={handleChangeSkill} />
                    <button 
                        type="button" 
                        onClick={() => console.log(skills)} 
                        className="px-6 py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CharactersPage;
