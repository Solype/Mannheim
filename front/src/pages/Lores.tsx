import React from 'react';
import MyMarkdown from '@/components/Markdown';

const LoresPage: React.FC = () => {
    const markdownContent = `
# Le Commencement du monde

Il est dit qu’à l’origine, le monde n’existait pas.
Le chaos originel était omniprésent, une immensité sans forme ni but.
Ce chaos était tel que rien ne pouvait exister en dehors de lui-même, si désordonné qu’il n’avait ni limite, ni temporalité, ni espace.
Car ces trois principes sont les premiers jalons de l’ordre.
Cependant, au sein de ce chaos infini, une chose incroyable se produisit : un fragment d’ordre émergea.
Etait ce le fruit du hasard au milieu des millions et milliards de possibilités engendrées par le chaos ?
Ou la réalisation d'un être supérieur au chaos ?
Cet événement improbable marqua la toute première étape vers la formation du monde tel que nous le connaissons aujourd'hui.
Avec ce mince filet d'ordre naquirent deux êtres : Kelnémore et Kélinenilèk.
Kelnémore incarnait la volonté du chaos originel qui ne cessait de s'enrager face à l'ordre naissant.
Kélinenilèk, quant à lui, était un voyageur du temps, émergeant dans cet espace où le temps venait d’apparaître, voyageant dans toutes les possibilités temporelles qu’offrait l’ordre.

![alt text](http://localhost:8080/api/lore/story/image/beginning.jpg)

`;
    return (
        <div className="relative overflow-auto" style={{ backgroundImage: 'url(/etoile.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="bg-black/50 h-full">
                <div className="p-5 mx-96 bg-white/75">
                    <h1 className="text-4xl font-bold text-center">Lores</h1>
                    <p className="text-lg mt-4 text-center">Welcome to the Lores!</p>
                    <p className="text-justify">
                        <MyMarkdown src={markdownContent} />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoresPage;
