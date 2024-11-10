import React from 'react';
import MyMarkdown from '@/components/Markdown';

const LoresPage: React.FC = () => {
    const markdownContent = `
# Titre
Ce texte est écrit en **Markdown**.

*italic*

__underline__
## Sous-titre

- Liste item 1
- Liste item 2

[Google](https://google.com)

`;
    return (
        <div className="text-center mt-5">
            <h1 className="text-4xl font-bold">Lores</h1>
            <p className="text-lg mt-4">Welcome to the Lores!</p>
            <MyMarkdown src={markdownContent}/>
        </div>
    );
};

export default LoresPage;
