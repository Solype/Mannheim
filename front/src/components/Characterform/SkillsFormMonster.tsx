import React, { useEffect, useState } from "react";
import { Skill } from "@/types/character_types";
import { dico } from "@/types/dico";
import { listSkills } from "./SkillsForm";

interface SingleSkillFormProps {
    skillName: string;
    pureValue: number;
    roleValue: number;
    skillValueSetter: (pure: number, role: number) => void;
    disabled: boolean;
    removeSkill: (skillName: string, category: string) => void;
}

const SingleSkillForm = ({ skillName, pureValue, roleValue, skillValueSetter, disabled }: SingleSkillFormProps) => {
    const onPureValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPureValue = Number(e.target.value);
        skillValueSetter(newPureValue, roleValue);
    };

    // const onRoleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newRoleValue = Number(e.target.value);
    //     skillValueSetter(pureValue, newRoleValue);
    // };

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
                    {/* <div className="flex flex-col items-center">
                        <label className="text-sm text-gray-500">Role</label>
                        <input
                            type="number"
                            value={roleValue}
                            onChange={onRoleValueChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            disabled={disabled}
                        />
                    </div> */}
                </div>
                {/* <p className="text-xl font-bold text-gray-900 self-center">= {pureValue + roleValue}</p>
                {!disabled && (
                    <button onClick={() => removeSkill(skillName, dico[skillName] ?? skillName)} className="text-red-500">
                        X
                    </button>
                    )} */}
            </div>
        </div>
    );
};

interface SkillFormProps {
    skillSetter: (skillName: string, skillCategory: string, pureValue: number, roleValue: number) => void;
    skills: Skill[];
    disabled: boolean;
    removeSetter: (skillName: string) => void;
    restoreSetter: (skillName: string) => void;
}

export default function SkillFormMonter({ skillSetter, skills, disabled, removeSetter, restoreSetter }: SkillFormProps) {
    const [removedSkills, setRemovedSkills] = useState<Skill[]>([]);

    useEffect(() => {
        setRemovedSkills(skills.filter(skill => skill.isRemoved));
    }, [skills]);

    const removeSkill = (skillName: string, category: string) => {
        setRemovedSkills([...removedSkills, { name: skillName, category, pureValue: 0, roleValue: 0, isRemoved: true }]);
        removeSetter(skillName);
    };

    const addSkill = (skill: Skill) => {
        setRemovedSkills(removedSkills.filter((s) => s.name !== skill.name));
        skillSetter(skill.name, skill.category, 0, 0);
        restoreSetter(skill.name);
    };

    return (
        <div className="space-y-8 bg-white bg-opacity-80 p-5 rounded-lg flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 self-center mt-4">Compétences</h1>
                {!disabled && removedSkills.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold text-gray-800">Ajouter des compétences supprimées</h2>
                        <select
                            onChange={(e) => {
                                const selectedSkill = removedSkills.find(skill => skill.name === e.target.value);
                                if (selectedSkill) addSkill(selectedSkill);
                            }}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            <option value="">Sélectionner une compétence</option>
                            {removedSkills.map((skill) => (
                                <option key={skill.name} value={skill.name}>
                                    {dico[skill.name] ?? skill.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
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
                                if (removedSkills.find(skill => skill.name === skillName)) {
                                    return null;
                                }
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
                                        removeSkill={removeSkill}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
