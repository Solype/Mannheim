import React from 'react';
import MyMarkdown from '@/components/Markdown';
import LoresService from '@/services/LoresService';
import { LoreStory } from '@/types/lore_types';
import { useParams } from 'react-router-dom';

const LoreStoryPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [loreStory, setLoreStory] = React.useState<LoreStory | null>(null);

    React.useEffect(() => {
        if (!id) {
            return;
        }
        LoresService.getLoreStory(id).then((story) => {
            setLoreStory(story)
            console.log(story);
        });
    }, []);

    if (!loreStory) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative overflow-auto h-full" style={{ backgroundImage: 'url(/etoile.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="bg-black/50 h-full">
                <div className="h-full p-5 mx-4 sm:mx-8 lg:mx-96 bg-white/75 rounded-lg">
                    <h1 className="text-4xl font-bold text-center mb-5">{loreStory.title}</h1>
                    <MyMarkdown src={loreStory.content} />
                </div>
            </div>
        </div>
    );
}

export default LoreStoryPage;