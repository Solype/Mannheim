import React, { useState } from 'react';
import { Skills } from '@/types';

interface SkillsProps {
    skills: Skills;
    file: string;
}

const skillCategories: { [key: string]: string[] } = {
    "Ranged Combat": ["bow", "crossbow", "exotic range", "small projectile", "gun"],
    "Melee Combat": ["haast", "exotic melee", "small blade", "sword", "axe", "saber", "hand-to-hand"],
    "Artillery": ["cannon", "engine"],
    "Protective Weapon": ["shield"],
    "Movement": ["acrobatics", "running", "balance", "riding", "escalation", "dodging", "swimming", "navigation", "reception", "jumping"],
    "Resistance": ["physical resistance", "mental resistance", "pathological resistance", "endurance"],
    "Survival": ["lockpicking", "stealth", "manipulation", "orientation", "fishing", "tracking", "reflex", "uprising"],
    "Social": ["dressage", "imposture", "intimidation", "speech", "persuasion", "psychology"],
    "Intellect": ["anatomical Knowledge", "artistic Knowledge", "biological Knowledge", "cultural Knowledge", "geographical Knowledge", "warrior Knowledge", "historical Knowledge", "linguistic Knowledge", "magical Knowledge", "mystical Knowledge", "technological Knowledge", "concentration", "deduction", "memory", "observation"],
    "Craftsmanship": ["visual arts", "chemistry", "construction", "cooking", "explosives", "blacksmithing", "medicine", "music"],
    "Magic": ["magic", "alchemy", "enhancement", "annihilation", "conjuration", "elementalism", "enchantment", "illusionism", "summoning", "necromancy", "perception", "sealing", "sorcery", "absorption"]
};

const SkillsComponent: React.FC<SkillsProps> = ({ skills, file }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [brutSkill, setBrutSkill] = useState(0);
    const [roleSkill, setRoleSkill] = useState(0);

    const handleBrutSkillChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setBrutSkill(Number(value));
        }
    };

    const handleRoleSkillChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setRoleSkill(Number(value));
        }
    };

    const handleSkillClick = (skillName: string, skillBase: number, skillBonus: number) => {
        setSelectedSkill(skillName);
        setIsModalOpen(true);
        setBrutSkill(skillBase);
        setRoleSkill(skillBonus);
    };

    const handleOkClick = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${file}/skill`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ brut: brutSkill, role: roleSkill, skill: selectedSkill }),
            })
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.error('Error updating skill:', error);
        }
    };

    const handleCancelClick = () => {
        setIsModalOpen(false);
        setBrutSkill(0);
        setRoleSkill(0);
    };

    const filteredCategories = Object.entries(skillCategories).map(([category, skillList]) => {
        const filteredSkills = skillList.filter(skill => skills[skill]);
        if (filteredSkills.length === 0) return null;

        return {
            category,
            skills: filteredSkills.map(skill => ({
                name: skill,
                total: skills[skill][0] + skills[skill][1],
                brut: skills[skill][0],
                role: skills[skill][1]
            }))
        };
    }).filter((category): category is { category: string; skills: { name: string; total: number; brut: number; role: number }[] } => category !== null);

    return (
        <div className="skills-section">
            <h3 className="text-2xl font-bold mb-2">Skills</h3>
            {filteredCategories.length > 0 ? (
                filteredCategories.map(({ category, skills }) => (
                    <div key={category} className="skill-category mb-4">
                        <h4 className="text-xl font-semibold mb-2">{category}</h4>
                        <ul>
                            {skills.map(skill => (
                                <li key={skill.name} className="flex justify-between" onClick={() => handleSkillClick(skill.name, skill.role, skill.brut)}>
                                    <span>{skill.name}:</span> <span>{skill.total}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No skills available.</p>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-black border border-white p-4 rounded text-white">
                    <h4 className="text-xl font-bold mb-2">Update {selectedSkill}</h4>
                    <p>Brut skill</p>
                    <textarea
                        value={brutSkill.toString()}
                        onChange={handleBrutSkillChange}
                        className="w-full p-2 border rounded mb-4 text-black"
                    />
                    <p>Role skill</p>
                    <textarea
                        value={roleSkill.toString()}
                        onChange={handleRoleSkillChange}
                        className="w-full p-2 border rounded mb-4 text-black"
                    />
                    <div className="flex justify-between w-full">
                        <button onClick={handleOkClick} className="px-4 py-2 bg-blue-500 text-white rounded">OK</button>
                        <button onClick={handleCancelClick} className="px-4 py-2 bg-red-500 rounded">Cancel</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default SkillsComponent;
