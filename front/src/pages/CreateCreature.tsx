import { useEffect, useState } from 'react';
import ReligionForm from '@/components/Characterform/ReligionForm';
import { Religion, Skill } from '@/types/character_types';
import { extractSkills, listSkills } from '@/components/Characterform/SkillsForm';
import SkillformMonter from '@/components/Characterform/SkillsFormMonster';
import AttributesForm from '@/components/Characterform/AttributesForm';
import { Attributes, getDefaultAttributes, CharacterOtherInfo } from '@/types/character_types';
import ListStringForm from '@/components/Characterform/ListStringForm';
import CharacterModifiactionUtils from '@/services/CharacterModifiactionUtils';
import { useNavigate } from 'react-router-dom';

const CreateCreaturePage = () => {
    const [ skills, setSkills ] = useState<Skill[]>(extractSkills(listSkills, null));
    const [ religion, setReligion ] = useState<Religion[]>([]);
    const [ attributes, setAttributes ] = useState<Attributes>(getDefaultAttributes());
    const [ mainRoles, setMainRoles ] = useState<string[]>([]);
    const [ secondaryRoles, setSecondaryRoles ] = useState<string[]>([]);
    const [ otherInfos, setOtherInfos ] = useState<CharacterOtherInfo>({ languages: [], experience: 0, mana: 0, money: 0 });
    const [name, setName] = useState<string>('');
    const navigate = useNavigate();


    const saveReligion = (religion: Religion[]) => {
        localStorage.setItem('religion_monstre', JSON.stringify(religion));
        setReligion(religion);
    }

    const saveAttributes = (attributes: Attributes) => {
        localStorage.setItem('attributes_monstre', JSON.stringify(attributes));
        setAttributes(attributes);
    }

    const saveMainRoles = (mainRoles: string[]) => {
        localStorage.setItem('mainRoles_monstre', JSON.stringify(mainRoles));
        setMainRoles(mainRoles);
    }

    const saveSecondaryRoles = (secondaryRoles: string[]) => {
        localStorage.setItem('secondaryRole_monstre', JSON.stringify(secondaryRoles));
        setSecondaryRoles(secondaryRoles);
    }

    const saveLanguages = (languages: string[]) => {
        localStorage.setItem('languages_monstre', JSON.stringify(languages));
        setOtherInfos({ ...otherInfos, languages: languages });
    }


    useEffect(() => {
        setReligion(JSON.parse(localStorage.getItem('religion_monstre') || '[]'));
        if (localStorage.getItem('attributes_monstre')) {
            setAttributes(JSON.parse(localStorage.getItem('attributes_monstre') || '{}'));
        } else {
            setAttributes(getDefaultAttributes());
        }
        setMainRoles(JSON.parse(localStorage.getItem('mainRoles_monstre') || '[]'));
        setSecondaryRoles(JSON.parse(localStorage.getItem('secondaryRole_monstre') || '[]'));
        setOtherInfos(JSON.parse(localStorage.getItem('languages_monstre') || '{ "languages": [], "experience": 0, "mana": 0, "money": 0 }'));
        const storedName = localStorage.getItem('name_monstre');
        setName(storedName ?? '');
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

    const handleRemoveSkill = (skillName: string) => {

        const new_skills = skills.map((skill) => {
            if (skill.name === skillName) {
                return { ...skill, isRemoved: true };
            }
            return skill;
        });
        setSkills(new_skills);
        localStorage.setItem('skills', JSON.stringify(new_skills));
    };
    
    const handleRestoreSkill = (skillName: string) => {
        const new_skills = skills.map((skill) => {
            if (skill.name === skillName) {
                return { ...skill, isRemoved: false };
            }
            return skill;
        });
        setSkills(new_skills);
        localStorage.setItem('skills', JSON.stringify(new_skills));
    };


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        localStorage.setItem('name_monstre', e.target.value);
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const filteredSkills = skills.filter(skill => !skill.isRemoved);

        const data = {
            skills: filteredSkills,
            religion,
            attributes,
            roles : { main: mainRoles, secondary: secondaryRoles },
            other : { ...otherInfos},
            infos: { name: name },
        }
        console.log(data);
        CharacterModifiactionUtils.createCreature(data);
        navigate('/creatures');
    }

    const reinitializeLocalStorage = () => {
        localStorage.removeItem('skills');
        localStorage.removeItem('religion_monstre');
        localStorage.removeItem('attributes_monstre');
        localStorage.removeItem('mainRoles_monstre');
        localStorage.removeItem('secondaryRole_monstre');
        localStorage.removeItem('languages_monstre');
        localStorage.removeItem('infos');
        localStorage.removeItem('priority');
        setSkills([]);
        setReligion([]);
        setAttributes(getDefaultAttributes());
        setMainRoles([]);
        setSecondaryRoles([]);
        setOtherInfos({languages: [], experience: 0, mana: 0, money: 0});
        setName('');
    }

    return (
        <div className="flex flex-col pt-10 px-40 relative overflow-auto h-full pb-20" style={{ backgroundImage: "url(/drag.png)", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <h1 className="text-5xl font-extrabold text-or mt-8 mb-20 self-center drop-shadow-lg stroke-white stroke-2">
                Créer une créature
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
                    <div className="">
                    </div>
                        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md ">
                            <label className="text-lg font-bold text-gray-800 self-center mb-5">Nom</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foret focus:outline-none"
                                placeholder="Entrez le nom"
                                required
                                disabled={false}
                            />
                        </div>
                            <AttributesForm attributes={attributes} setter={saveAttributes} disabled={false}/>
                    <ListStringForm title="Roles primaire" setter={saveMainRoles} listString={mainRoles} disabled={false}/>
                    <ListStringForm title="Roles secondaires" setter={saveSecondaryRoles} listString={secondaryRoles} disabled={false}/>
                    <ListStringForm title="Langues" setter={saveLanguages} listString={otherInfos.languages} disabled={false}/>

                    <ReligionForm setter={saveReligion} listReligions={religion} disabled={false}/>
                </div>

                <div className="col-span-3">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <SkillformMonter skillSetter={handleChangeSkill} skills={skills} disabled={false} removeSetter={handleRemoveSkill} restoreSetter={handleRestoreSkill}/>
                        <button type="submit" className="bg-or border border-white/70 text-light_foret font-bold text-2xl  p-4 hover:bg-light_or hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none">
                            Sauvegarder
                        </button>
                    </form>
                </div>
            </div>
            <style>{`
                .stroke-white {
                    -webkit-text-stroke: 1px black;
                }
            `}</style>
        </div>

    );
}

export default CreateCreaturePage;
