import { useEffect, useState } from 'react';
import ReligionForm from '@/components/Characterform/ReligionForm';
import { Religion, Skill } from '@/types/character_types';
import SkillForm, { extractSkills, listSkills } from '@/components/Characterform/SkillsForm';
import AttributesForm from '@/components/Characterform/AttributesForm';
import { Attributes, getDefaultAttributes, Priority, CharacterOtherInfo, BasicCharaInfo } from '@/types/character_types';
import BasicForm from '@/components/Characterform/BasicInfoForm';
import PriorityForm from '@/components/Characterform/PriorityForm';
import ListStringForm from '@/components/Characterform/ListStringForm';
import CharacterModifiactionUtils from '@/services/CharacterModifiactionUtils';
import { useNavigate } from 'react-router-dom';

const CreateCharacterPage = () => {
    const [ skills, setSkills ] = useState<Skill[]>(extractSkills(listSkills));
    const [ religion, setReligion ] = useState<Religion[]>([]);
    const [ attributes, setAttributes ] = useState<Attributes>(getDefaultAttributes());
    const [ mainRoles, setMainRoles ] = useState<string[]>([]);
    const [ secondaryRoles, setSecondaryRoles ] = useState<string[]>([]);
    const [ otherInfos, setOtherInfos ] = useState<CharacterOtherInfo>({ languages: [], experience: 0, mana: 0, money: 0 });
    const [ infos, setBasicInfo ] = useState<BasicCharaInfo>({ name: "", age: 0, race: "", gender: "" });
    const [ priority, setPriority ] = useState<Priority>({ role: "", attribute: "", skills: "", money: "" });
    const navigate = useNavigate();


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
        setOtherInfos({ ...otherInfos, languages: languages });
    }

    const saveBasicInfo = (infos: BasicCharaInfo) => {
        localStorage.setItem('infos', JSON.stringify(infos));
        setBasicInfo(infos);
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
        setOtherInfos(JSON.parse(localStorage.getItem('languages') || '{ "languages": [], "experience": 0, "mana": 0, "money": 0 }'));
        setBasicInfo(JSON.parse(localStorage.getItem('infos') || '{"name": "", "age": 0, "race": "", "gender": ""}'));
        setPriority(JSON.parse(localStorage.getItem('priority') || '{ "role": "", "attribute": "", "skills": "", "money": "" }'));
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
            roles : { main: mainRoles, secondary: secondaryRoles },
            other : { ...otherInfos},
            infos,
            priority
        }
        console.log(data);
        CharacterModifiactionUtils.createCharacter(data);
        navigate('/characters');
    }

    const reinitializeLocalStorage = () => {
        localStorage.removeItem('skills');
        localStorage.removeItem('religion');
        localStorage.removeItem('attributes');
        localStorage.removeItem('mainRoles');
        localStorage.removeItem('secondaryRoles');
        localStorage.removeItem('languages');
        localStorage.removeItem('infos');
        localStorage.removeItem('priority');
        setSkills([]);
        setReligion([]);
        setAttributes(getDefaultAttributes());
        setMainRoles([]);
        setSecondaryRoles([]);
        setOtherInfos({languages: [], experience: 0, mana: 0, money: 0});
        setBasicInfo({ name: "", age: 0, race: "", gender: "" });
        setPriority({ role: "", attribute: "", skills: "", money: "" });
    }

    return (
        <div className="flex flex-col pt-10 px-40 relative overflow-auto h-full pb-20" style={{ backgroundImage: "url(/drag.png)", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <h1 className="text-5xl font-extrabold text-or mt-8 mb-20 self-center drop-shadow-lg stroke-white stroke-2">
                Créer un personnage
            </h1>

            <div className="flex justify-between items-start mb-10">
                <button className="bg-pierre border border-black text-black font-bold text-xl p-2 px-4 hover:bg-light_pierre hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none"
                    onClick={reinitializeLocalStorage}>
                    Réinitialiser
                </button>

                <button
                    className={`bg-or border border-white/70 text-light_foret font-bold text-xl p-2 px-4 hover:bg-light_or hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none `}
                    onClick={handleSubmit}
                >
                    Sauvegarder
                </button>
            </div>
            <div className='grid grid-cols-5 gap-7 justify-between items-start'>
                <div className="col-span-2 space-y-4">
                    <BasicForm formData={infos} setFormData={saveBasicInfo} disabled={false}/>
                    <div className='grid grid-cols-5 gap-3 '>
                        <div className='col-span-2'>
                            <PriorityForm initialPriority={priority} onSubmit={savePriority} disabled={false}/>
                        </div>
                        <div className='col-span-3'>
                            <AttributesForm attributes={attributes} setter={saveAttributes} disabled={false}/>
                        </div>
                    </div>
                    <ListStringForm title="Roles primaire" setter={saveMainRoles} listString={mainRoles} disabled={false}/>
                    <ListStringForm title="Roles secondaires" setter={saveSecondaryRoles} listString={secondaryRoles} disabled={false}/>
                    <ListStringForm title="Langues" setter={saveLanguages} listString={otherInfos.languages} disabled={false}/>

                    <ReligionForm setter={saveReligion} listReligions={religion} disabled={false}/>
                </div>

                <div className="col-span-3">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <SkillForm skillSetter={handleChangeSkill} skills={skills} disabled={false}/>
                        <button type="submit" className="bg-or border border-white/70 text-light_foret font-bold text-2xl  p-4 hover:bg-light_or hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none">
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
}

export default CreateCharacterPage;
