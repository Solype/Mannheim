import { Skill } from "@/types/character_types";
import { dico } from "@/types/dico";

export const listSkills = {
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

export function extractSkills(listSkills: Record<string, string[]>, skillsData: Skill[] | null): Skill[] {
    const storedSkills = skillsData ?? JSON.parse(localStorage.getItem('skills') || '[]');
    // console.log(storedSkills);
    const skills: Skill[] = [];

    for (const category in listSkills) {
        if (listSkills.hasOwnProperty(category)) {
            const skillNames = listSkills[category];

            skillNames.forEach(skillName => {
                const existingSkill = storedSkills.find(
                    (skill: Skill) => skill.name === skillName && skill.category === category
                );
                skills.push({
                    name: skillName,
                    category,
                    pureValue: existingSkill ? existingSkill.pureValue : 0,
                    roleValue: existingSkill ? existingSkill.roleValue : 0
                });
            });
        }
    }

    return skills;
}


interface SingleSkillFormProps {
    skillName: string;
    pureValue: number;
    roleValue: number;
    skillValueSetter: (pure: number, role: number) => void;
    disabled: boolean;
}

const SingleSkillForm = ({ skillName, pureValue, roleValue, skillValueSetter, disabled }: SingleSkillFormProps) => {

    const onPureValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPureValue = Number(e.target.value);
        skillValueSetter(newPureValue, roleValue);
    };

    const onRoleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRoleValue = Number(e.target.value);
        skillValueSetter(pureValue, newRoleValue);
    };

    return (
        <div className="flex items-center justify-between rounded-lg ">
            <p className="font-semibold text-gray-700 capitalize text-sm">{dico[skillName] ?? skillName}</p>
            <div className="flex items-center space-x-4">
                <div className="flex space-x-2 items-center">
                    <div className="flex flex-col items-center">
                        <label className="text-sm text-gray-500">Pure</label>
                        <input
                            type="number"
                            value={pureValue}
                            onChange={onPureValueChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            disabled={disabled}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="text-sm text-gray-500">Role</label>
                        <input
                            type="number"
                            value={roleValue}
                            onChange={onRoleValueChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            disabled={disabled}
                        />
                    </div>
                </div>
                <p className="text-xl font-bold text-gray-900 self-center">= {pureValue + roleValue}</p>
            </div>
        </div>
    );
};


interface SkillFormProps {
    skillSetter: (skillName: string, skillCategory: string, pureValue: number, roleValue: number) => void;
    skills: Skill[];
    disabled: boolean;
}

export default function SkillForm({ skillSetter, skills, disabled }: SkillFormProps) {
    return (
        <div className="space-y-8 bg-white bg-opacity-80 p-5 rounded-lg flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 self-center mt-4">Compétences</h1>
            <div className="grid grid-cols-2 gap-5">
                {Object.entries(listSkills).map(([category, skillNames]) => (
                    <div key={category} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                        <h1 className="text-lg font-bold text-gray-800 pb-2 mb-4 capitalize self-center">
                            {dico[category] ?? category}
                        </h1>
                        <div className="space-y-1">
                            {skillNames.map((skillName: string) => {
                                const currentSkill = skills.find(
                                    skill => skill.name === skillName && skill.category === category
                                );
                                return (
                                    <SingleSkillForm
                                        key={skillName}
                                        skillName={skillName}
                                        pureValue={currentSkill?.pureValue || 0}
                                        roleValue={currentSkill?.roleValue || 0}
                                        skillValueSetter={(pure: number, role: number) =>
                                            skillSetter(skillName, category, pure, role)
                                        }
                                        disabled={disabled}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

