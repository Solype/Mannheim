import { useState } from 'react';
import ReligionForm from '@/components/Characterform/ReligionForm';
import { Religion, Skill } from '@/types/character_types';
import SkillForm, { extractSkills, listSkills } from '@/components/Characterform/SkillsForm';
import AttributesForm from '@/components/Characterform/AttributesForm';
import { Attributes, getDefaultAttributes, CharacterBasicInfo, Priority } from '@/types/character_types';
import BasicForm from '@/components/Characterform/BasicInfoForm';
import PriorityForm from '@/components/Characterform/PriorityForm';
import ListStringForm from '@/components/Characterform/ListStringForm';

const CharactersPage = () => {
    const [ skills, setSkills ] = useState<Skill[]>(extractSkills(listSkills));
    const [ religion, setReligion ] = useState<Religion[]>([]);
    const [ attributes, setAttributes ] = useState<Attributes>(getDefaultAttributes());
    const [ mainRoles, setMainRoles ] = useState<string[]>([]);
    const [ secondaryRoles, setSecondaryRoles ] = useState<string[]>([]);
    const [ languages, setLanguages ] = useState<string[]>([]);
    const [ basicInfo, setBasicInfo ] = useState<CharacterBasicInfo>({ name: "", age: 0, species: "", gender: "" });
    const [ priority, setPriority ] = useState<Priority>({ role: "", attribute: "", skills: "", money: "" });

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
                <BasicForm formData={basicInfo} setFormData={setBasicInfo} />
                <PriorityForm initialPriority={priority} onSubmit={setPriority} />
                <AttributesForm attributes={attributes} setter={setAttributes} />
                <ListStringForm title="Primary role Roles" setter={setMainRoles} listString={mainRoles} />
                <ListStringForm title="Secondary Roles" setter={setSecondaryRoles} listString={secondaryRoles} />
                <ListStringForm title="languages" setter={setLanguages} listString={languages} />

                <ReligionForm setter={setReligion} listReligions={religion} />
            </div>

            <div className="w-1/2">
                <h1 className="text-3xl font-bold text-white mb-6">Create Character</h1>
                <form className="flex flex-col space-y-4">
                    <SkillForm skillSetter={handleChangeSkill} />
                </form>
            </div>
        </div>
    );
};

export default CharactersPage;
