//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export interface Infos {
    age: number;
    gender: string;
    race: string;
}

export interface Monitor {
    [key: string]: number[];
}

export interface Other {
    language: string[];
    inventory: string[];
    specialAbilities: string[];
    spells: string[];
    experience: number;
    mana: number;
    money: number;
}

export interface Priority {
    [key: string]: string;
}

export interface Religion {
    gods: { [key: string]: number };
}

export interface Roles {
    main: string[];
    secondary: string[];
}

export interface Skills {
    [key: string]: [number, number];
}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


export interface HealthData {
    name: string;
    file: string;
    "physical health": [number, number];
    "mental health": [number, number];
    "endurance health": [number, number];
    "pathological health": [number, number];
    mana: [number, number];
}

export interface Attributes {
    [key: string]: number;
}

export interface PlayerData {
    attributes: Attributes;
    [key: string]: any;
}
