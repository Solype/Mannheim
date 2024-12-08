export type LoreStories = {
    id: number;
    title: string;
    short_description: string;
};

export type LoreEntities = {
    id: number;
    name: string;
    short_description: string;
};

export type LoreStory = {
    id: number;
    title: string;
    short_description: string;
    content: string;
    related_entities: LoreEntities[];
    related_stories: LoreStories[];
};
