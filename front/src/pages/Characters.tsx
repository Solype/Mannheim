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
        <div className="bg-slate-500 flex justify-between items-start pt-10 px-10">
            <Link to="/create-character" className="bg-white text-black p-3 rounded-lg">Create Character</Link>
            {characters.map((character, index) => (
                <div key={index} className="w-1/2 space-y-4">
                    <h1>${character.infos.name}</h1>
                    <p>${character.infos.age}</p>
                    <p>${character.infos.race}</p>
                    <p>${character.infos.gender}</p>
                </div>
            ))}
        </div>
    );
};

export default CharactersPage;
