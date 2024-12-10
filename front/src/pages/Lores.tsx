import React from 'react';
import LoresService from '@/services/LoresService';
import { LoreEntities, LoreStories } from '@/types/lore_types';
import { Link } from 'react-router-dom';

const LoresPage: React.FC = () => {
    const [loreStories, setLoreStories] = React.useState<LoreStories[]>([]);
    const [loreEntities, setLoreEntities] = React.useState<LoreEntities[]>([]);

    React.useEffect(() => {
        LoresService.getLoreStories().then((stories) => setLoreStories(stories));
        LoresService.getLoreEntities().then((entities) => setLoreEntities(entities));
    }, []);

    return (
        <div className="relative overflow-auto h-full" style={{ backgroundImage: 'url(/etoile.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="bg-black/50 h-full">
                <div className="p-5 mx-32 bg-white/75 h-full">
                    <h1 className="text-4xl font-bold text-center">Univers</h1>
                    <p className="text-lg mt-4 text-center">Découvrez le monde d'Ul</p>
                    <div className='mt-5 '>
                        <div className='mb-10'>
                            <h2 className="text-3xl font-bold border-b-4 border-slate-400 pb-2 mb-5">Histoires</h2>
                            <div className="grid grid-cols-3 gap-5">
                                {loreStories.map((story) => (
                                    <Link to={"/lore/story/" + story.id} key={story.id} className="bg-white rounded h-32 p-3 hover:bg-slate-300 transition-colors duration-300">
                                        <h3 className="text-xl font-bold">{story.title}</h3>
                                        <p>{story.short_description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold border-b-4 border-slate-400 pb-2 mb-5">Personnages</h2>
                            <div className="grid grid-cols-3 gap-5">
                                {loreEntities.map((entity) => (
                                    <div key={entity.id} className="border p-3">
                                        <h3 className="text-xl font-bold">{entity.name}</h3>
                                        <p>{entity.short_description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoresPage;
