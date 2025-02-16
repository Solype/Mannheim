import { useEffect, useState } from 'react';
import ReligionForm from '@/components/Characterform/ReligionForm';
import { Religion, Skill } from '@/types/character_types';
import { extractSkills, listSkills } from '@/components/Characterform/SkillsForm';
import SkillsformMonter from '@/components/Characterform/SkillsFormMonster';
import AttributesForm from '@/components/Characterform/AttributesForm';
import { Attributes, getDefaultAttributes, CharacterOtherInfo } from '@/types/character_types';
import ListStringForm from '@/components/Characterform/ListStringForm';
import CharacterModifiactionUtils from '@/services/CharacterModifiactionUtils';
import { useParams } from 'react-router-dom';

const CreatureViewPage = () => {
    const { id } = useParams<{id: string}>();
    const [ skills, setSkills ] = useState<Skill[]>([]);
    const [ religion, setReligion ] = useState<Religion[]>([]);
    const [ attributes, setAttributes ] = useState<Attributes>(getDefaultAttributes());
    const [ mainRoles, setMainRoles ] = useState<string[]>([]);
    const [ secondaryRoles, setSecondaryRoles ] = useState<string[]>([]);
    const [ otherInfos, setOtherInfos ] = useState<CharacterOtherInfo>({ languages: [], experience: 0, mana: 0, money: 0 });
    const [name, setName] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);


    const saveReligion = (religion: Religion[]) => {
        setReligion(religion);
    }

    const saveAttributes = (attributes: Attributes) => {
        setAttributes(attributes);
    }

    const saveMainRoles = (mainRoles: string[]) => {
        setMainRoles(mainRoles);
    }

    const saveSecondaryRoles = (secondaryRoles: string[]) => {
        setSecondaryRoles(secondaryRoles);
    }

    const saveLanguages = (languages: string[]) => {
        setOtherInfos({ ...otherInfos, languages: languages });
    }

    const loadCharacter = () => {
        if (!id) { return; }

        CharacterModifiactionUtils.getCharacter(id).then(
            (character) => {
                setSkills(extractSkills(listSkills, character.skills));
                setReligion(character.religion);
                setAttributes(character.attributes);
                setMainRoles(character.roles.main);
                setSecondaryRoles(character.roles.secondary);
                setOtherInfos(character.other);
                setName(character.infos.name);
            }
        );
    }

    useEffect(() => {
        loadCharacter();
    }, []);

    const handleChangeSkill = (skillName: string, skillCategory: string, pureValue: number, roleValue: number) => {
        const new_skills = skills.map((skill) => {
            if (skill.name === skillName && skill.category === skillCategory) {
                return { ...skill, pureValue, roleValue };
            }
            return skill;
        });
        setSkills(new_skills);
        console.log(new_skills);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        localStorage.setItem('name_monstre', e.target.value);
    }


    const handleRemoveSkill = (skillName: string) => {
        const new_skills = skills.map((skill) => {
            if (skill.name === skillName) {
                return { ...skill, isRemoved: true };
            }
            return skill;
        });
        setSkills(new_skills);
        console.log(new_skills);
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


    const handleSubmit = (e: React.FormEvent) => {
        if (!id) { return; }
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
        CharacterModifiactionUtils.updateCharacter(data, id);
        setIsDisabled(true);
    }

    const reinitializeData = () => {
        loadCharacter();
    }

    return (
        <div className="flex flex-col pt-10 px-40 relative overflow-auto h-full pb-20" style={{ backgroundImage: "url(/drag.png)", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <h1 className="text-5xl font-extrabold text-or mt-8 mb-20 self-center drop-shadow-lg stroke-white stroke-2 ">
                {name}
            </h1>

            <div className="flex justify-between items-start mb-10">
                {isDisabled ? (
                    <button className="bg-or border border-black text-black font-bold text-xl p-2 px-4 hover:bg-light_or hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none"
                        onClick={() => setIsDisabled(false)}>
                        Modifier
                    </button>
                )
                : (
                    <>
                        <button className="bg-pierre border border-black text-black font-bold text-xl p-2 px-4 hover:bg-light_pierre hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none"
                            onClick={reinitializeData}>
                            Réinitialiser
                        </button>

                        <button
                            className={`bg-or border border-white/70 text-light_foret font-bold text-xl p-2 px-4 hover:bg-light_or hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none `}
                            onClick={handleSubmit}
                        >
                            Sauvegarder
                        </button>
                    </>
                )}
            </div>
            <div className='grid grid-cols-5 gap-7 justify-between items-start'>
                <div className="col-span-2 space-y-4">
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
                        <div className='col-span-3'>
                            <AttributesForm attributes={attributes} setter={saveAttributes} disabled={isDisabled}/>
                        </div>
                    <ListStringForm title="Roles primaire" setter={saveMainRoles} listString={mainRoles} disabled={isDisabled}/>
                    <ListStringForm title="Roles secondaires" setter={saveSecondaryRoles} listString={secondaryRoles} disabled={isDisabled}/>
                    <ListStringForm title="Langues" setter={saveLanguages} listString={otherInfos.languages} disabled={isDisabled}/>

                    <ReligionForm setter={saveReligion} listReligions={religion} disabled={isDisabled}/>
                </div>

                <div className="col-span-3">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <SkillsformMonter skillSetter={handleChangeSkill} skills={skills} disabled={isDisabled} removeSetter={handleRemoveSkill} restoreSetter={handleRestoreSkill}/>
                        {!isDisabled && (
                            <button type="submit" className="bg-or border border-white/70 text-light_foret font-bold text-2xl  p-4 hover:bg-light_or hover:shadow-[0_0_10px_4px_rgba(255,255,255,0.7)] transition-all duration-30 rounded-lg focus:outline-none">
                                Sauvegarder
                            </button>
                        )}
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

export default CreatureViewPage;
