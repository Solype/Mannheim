import { useState } from 'react';
import ReligionForm from '@/components/Characterform/ReligionForm';
import { Religion, Skill } from '@/types/character_types';
import SkillForm, { extractSkills, listSkills } from '@/components/Characterform/SkillsForm';
import AttributesForm from '@/components/Characterform/AttributesForm';
import { Attributes, getDefaultAttributes, CharacterBasicInfo, Priority } from '@/types/character_types';
import BasicForm from '@/components/Characterform/BasicInfoForm';
import PriorityForm from '@/components/Characterform/PriorityForm';
import ListStringForm from '@/components/Characterform/ListStringForm';
import CharacterModifiactionUtils from '@/services/CharacterModifiactionUtils';

const CreateCharacterPage = () => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            skills,
            religion,
            attributes,
            mainRoles,
            secondaryRoles,
            languages,
            basicInfo,
            priority
        }
        console.log(data);
        CharacterModifiactionUtils.createCharacter(data);
    }

    return (
        <div className=" flex gap-10 justify-between items-start pt-10 px-10" style={{backgroundImage: "url(/drag.png)", backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
            <div className="w-1/2 space-y-4">
                <h2 className="text-2xl font-semibold text-white">Objects / Info</h2>
                <p className="text-white">Put any objects or information here</p>
                <BasicForm formData={basicInfo} setFormData={setBasicInfo} />
                <PriorityForm initialPriority={priority} onSubmit={setPriority} />
                <AttributesForm attributes={attributes} setter={setAttributes} />
                <ListStringForm title="Roles primaire" setter={setMainRoles} listString={mainRoles} />
                <ListStringForm title="Roles secondaires" setter={setSecondaryRoles} listString={secondaryRoles} />
                <ListStringForm title="Langues" setter={setLanguages} listString={languages} />

                <ReligionForm setter={setReligion} listReligions={religion} />
            </div>

            <div className="w-1/2">
                <h1 className="text-3xl font-bold text-white mb-6">Create Character</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <SkillForm skillSetter={handleChangeSkill} />
                    <button type="submit" className="bg-light_foret text-white px-4 py-2 rounded-lg hover:bg-foret focus:outline-none">
                        Create Character
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCharacterPage;
