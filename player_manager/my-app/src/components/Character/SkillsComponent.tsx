import React from 'react';
import { Skills } from '@/types';

interface SkillsProps {
    skills: Skills;
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

const SkillsComponent: React.FC<SkillsProps> = ({ skills }) => {
    const filteredCategories = Object.entries(skillCategories).map(([category, skillList]) => {
        const filteredSkills = skillList.filter(skill => skills[skill]);
        if (filteredSkills.length === 0) return null;

        return {
            category,
            skills: filteredSkills.map(skill => ({
                name: skill,
                total: skills[skill][0] + skills[skill][1]
            }))
        };
    }).filter((category): category is { category: string; skills: { name: string; total: number; }[] } => category !== null);

    return (
        <div className="skills-section">
            <h3 className="text-2xl font-bold mb-2">Skills</h3>
            {filteredCategories.length > 0 ? (
                filteredCategories.map(({ category, skills }) => (
                    <div key={category} className="skill-category mb-4">
                        <h4 className="text-xl font-semibold mb-2">{category}</h4>
                        <ul>
                            {skills.map(skill => (
                                <li key={skill.name} className="flex justify-between">
                                    <span>{skill.name}:</span> <span>{skill.total}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No skills available.</p>
            )}
        </div>
    );
};

export default SkillsComponent;
