import { useEffect, useState } from 'react';
import { CharacterBasicInfo } from '@/types/character_types';
import { Link } from 'react-router-dom';
import CharacterModifiactionUtils from '@/services/CharacterModifiactionUtils';

const CharactersPage = () => {
    const [characters, setCharacters] = useState<CharacterBasicInfo[]>([]);

    useEffect(() => {
        CharacterModifiactionUtils.getCharacters().then(
            (characters) => {
                setCharacters(characters);
                console.log(characters);
            }
        );
    }, []);

    return (
        <div className="flex flex-col pt-10 px-40 relative overflow-auto h-full pb-20" style={{ backgroundImage: "url(/drag.png)", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <h1 className="text-5xl font-extrabold text-or mt-8 mb-10 self-center drop-shadow-lg stroke-white stroke-2">
                Personnages
            </h1>

            <div className="flex justify-end mb-5">
                <Link 
                    to="/create-character" 
                    className="bg-or border border-white/70 text-light_foret font-bold text-2xl p-3 px-6 rounded-lg shadow-lg hover:bg-light_or hover:shadow-[0_0_15px_6px_rgba(255,255,255,0.8)] focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                    + Créer un personnage
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
                {characters.map((character, index) => (
                    <Link 
                        to={"/characters/" + character.id} 
                        key={index} 
                        className="bg-white bg-opacity-80 p-5 rounded-lg shadow-lg hover:bg-opacity-100 transition-all duration-300"
                    >
                        {/* <div className="w-full h-40 bg-gray-300 rounded-lg mb-3 flex items-center justify-center">
                            <span className="text-gray-500">Photo</span>
                        </div> */}

                        <h1 className="font-bold text-2xl">{character.infos.name}</h1>
                        <p className="mt-2 text-gray-700">Âge : {character.infos.age}</p>
                        <p className="text-gray-700">Espèce : {character.infos.race}</p>
                        <p className="text-gray-700">Genre : {character.infos.gender}</p>
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

export default CharactersPage;
