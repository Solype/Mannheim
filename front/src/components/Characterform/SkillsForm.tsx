import { useState } from "react";
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

export function extractSkills(listSkills: Record<string, string[]>): Skill[] {
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
        <div className="flex items-center justify-between space-x-4 bg-white shadow-lg p-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <p className="font-semibold text-gray-700 capitalize">{dico[skillName] ?? skillName}</p>
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

export default function SkillForm({ skillSetter }: SkillFormProps)
{
    return (
        <div className="space-y-8">
            {Object.entries(listSkills).map(([category, skills]) => (
                <div key={category} className="bg-white  bg-opacity-80 p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 capitalize">
                        {dico[category] ?? category}
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
