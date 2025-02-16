import { useEffect, useState } from 'react';
import { CharacterBasicInfo } from '@/types/character_types';
import { Link } from 'react-router-dom';
import CharacterModifiactionUtils from '@/services/CharacterModifiactionUtils';

const CreaturesPage = () => {
    const [creatures, setCreatures] = useState<CharacterBasicInfo[]>([]);

    useEffect(() => {
        CharacterModifiactionUtils.getCreatures().then(
            (creatures) => {
                setCreatures(creatures);
                console.log(creatures);
            }
        );
    }, []);

    return (
        <div className="flex flex-col pt-10 px-40 relative overflow-auto h-full pb-20" style={{ backgroundImage: "url(/drag.png)", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <h1 className="text-5xl font-extrabold text-or mt-8 mb-10 self-center drop-shadow-lg stroke-white stroke-2">
                Créatures
            </h1>

            <div className="flex justify-end mb-5">
                <Link 
                    to="/create-creature" 
                    className="bg-or border border-white/70 text-light_foret font-bold text-2xl p-3 px-6 rounded-lg shadow-lg hover:bg-light_or hover:shadow-[0_0_15px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                    + Créer une créature
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
                {creatures.map((creature, index) => (
                    <Link 
                        to={"/creatures/" + creature.id} 
                        key={index} 
                        className="bg-white bg-opacity-80 p-5 rounded-lg shadow-lg hover:bg-opacity-100 transition-all duration-300"
                    >
                        <h1 className="font-bold text-2xl">{creature.infos.name}</h1>
                    </Link>
                ))}
            </div>

            <style>{`
                .stroke-white {
                    -webkit-text-stroke: 1px black;
                }
            `}</style>
        </div>
    );
};

export default CreaturesPage;
