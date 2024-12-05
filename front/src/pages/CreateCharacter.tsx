import { useEffect, useState } from 'react';
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


    const saveReligion = (religion: Religion[]) => {
        localStorage.setItem('religion', JSON.stringify(religion));
        setReligion(religion);
    }

    const saveAttributes = (attributes: Attributes) => {
        localStorage.setItem('attributes', JSON.stringify(attributes));
        setAttributes(attributes);
    }

    const saveMainRoles = (mainRoles: string[]) => {
        localStorage.setItem('mainRoles', JSON.stringify(mainRoles));
        setMainRoles(mainRoles);
    }

    const saveSecondaryRoles = (secondaryRoles: string[]) => {
        localStorage.setItem('secondaryRoles', JSON.stringify(secondaryRoles));
        setSecondaryRoles(secondaryRoles);
    }

    const saveLanguages = (languages: string[]) => {
        localStorage.setItem('languages', JSON.stringify(languages));
        setLanguages(languages);
    }

    const saveBasicInfo = (basicInfo: CharacterBasicInfo) => {
        localStorage.setItem('basicInfo', JSON.stringify(basicInfo));
        setBasicInfo(basicInfo);
    }

    const savePriority = (priority: Priority) => {
        localStorage.setItem('priority', JSON.stringify(priority));
        setPriority(priority);
    }

    useEffect(() => {
        setReligion(JSON.parse(localStorage.getItem('religion') || '[]'));
        if (localStorage.getItem('attributes')) {
            setAttributes(JSON.parse(localStorage.getItem('attributes') || '{}'));
        } else {
            setAttributes(getDefaultAttributes());
        }
        setMainRoles(JSON.parse(localStorage.getItem('mainRoles') || '[]'));
        setSecondaryRoles(JSON.parse(localStorage.getItem('secondaryRoles') || '[]'));
        setLanguages(JSON.parse(localStorage.getItem('languages') || '[]'));
        setBasicInfo(JSON.parse(localStorage.getItem('basicInfo') || '{}'));
        setPriority(JSON.parse(localStorage.getItem('priority') || '{}'));
    }, []);

    const handleChangeSkill = (skillName: string, skillCategory: string, pureValue: number, roleValue: number) => {
        const new_skills = skills.map((skill) => {
            if (skill.name === skillName && skill.category === skillCategory) {
                return { ...skill, pureValue, roleValue };
            }
            return skill;
        });
        setSkills(new_skills);
        localStorage.setItem('skills', JSON.stringify(new_skills));
        console.log(new_skills);
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

    const reinitializeLocalStorage = () => {
        localStorage.removeItem('skills');
        localStorage.removeItem('religion');
        localStorage.removeItem('attributes');
        localStorage.removeItem('mainRoles');
        localStorage.removeItem('secondaryRoles');
        localStorage.removeItem('languages');
        localStorage.removeItem('basicInfo');
        localStorage.removeItem('priority');
        setSkills([]);
        setReligion([]);
        setAttributes(getDefaultAttributes());
        setMainRoles([]);
        setSecondaryRoles([]);
        setLanguages([]);
        setBasicInfo({ name: "", age: 0, species: "", gender: "" });
        setPriority({ role: "", attribute: "", skills: "", money: "" });
    }

    return (
        <div className="flex flex-col pt-10 px-40 relative overflow-auto h-full pb-20" style={{ backgroundImage: "url(/drag.png)", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <h1 className="text-5xl font-extrabold text-or mt-8 mb-20 self-center drop-shadow-lg stroke-white stroke-2">
                Créer un personnage
            </h1>

            <div className="flex justify-between items-start mb-10">
                <button className="bg-pierre border border-black text-black font-bold text-xl p-2 px-4 hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none"
                    onClick={reinitializeLocalStorage}>
                    Réinitialiser
                </button>

                <button
                    className={`bg-or border border-white/70 text-light_foret font-bold text-xl p-2 px-4 hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none `}
                    onClick={handleSubmit}
                >
                    Sauvegarder
                </button>
            </div>
            <div className='grid grid-cols-5 gap-7 justify-between items-start'>
                <div className="col-span-2 space-y-4">
                    <BasicForm formData={basicInfo} setFormData={saveBasicInfo} />
                    <div className='grid grid-cols-5 gap-3 '>
                        <div className='col-span-2'>
                            <PriorityForm initialPriority={priority} onSubmit={savePriority} />
                        </div>
                        <div className='col-span-3'>
                            <AttributesForm attributes={attributes} setter={saveAttributes} />
                        </div>
                    </div>
                    <ListStringForm title="Roles primaire" setter={saveMainRoles} listString={mainRoles} />
                    <ListStringForm title="Roles secondaires" setter={saveSecondaryRoles} listString={secondaryRoles} />
                    <ListStringForm title="Langues" setter={saveLanguages} listString={languages} />

                    <ReligionForm setter={saveReligion} listReligions={religion} />
                </div>

                <div className="col-span-3">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <SkillForm skillSetter={handleChangeSkill} skills={skills} />
                    <button type="submit" className="bg-or border border-white/70 text-light_foret font-bold text-2xl  p-4  hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none">
                            Sauvegarder
                        </button>
                    </form>
                </div>
            </div>
            <style jsx>{`
                .stroke-white {
                    -webkit-text-stroke: 1px black;
                }
            `}</style>
        </div>

    );
};



export default CreateCharacterPage;
