export type Attributes = {
    resistancy: number;
    strength: number;
    agility: number;
    dexterity: number;
    vivacity: number;
    intelligence: number;
    sociality: number;
};

export type RangedWeapons = {
    bow: number;
    crossbow: number;
    exoticWeapon: number;
    smallProjectile: number;
    pistol: number;
};

export type Artillery = {
    cannon: number;
    engine: number;
};

export type MeleeWeapons = {
    polearm: number;
    exoticWeapon: number;
    blunt: number;
    shortBlade: number;
    sword: number;
    axe: number;
    saber: number;
    bareHands: number;
};

export type Protective = {
    shield: number;
};

export type Movement = {
    acrobatics: number;
    running: number;
    balance: number;
    riding: number;
    climbing: number;
    dodging: number;
    swimming: number;
    navigation: number;
    landing: number;
    jumping: number;
};

export type Resistance = {
    endurance: number;
    mental: number;
    pathological: number;
    physical: number;
};

export type Survival = {
    lockpicking: number;
    stealth: number;
    manipulation: number;
    orientalKnowledge: number;
    fishing: number;
    tracking: number;
    reflex: number;
    lifting: number;
};

export type Social = {
    taming: number;
    deceit: number;
    intimidation: number;
    speech: number;
    persuasion: number;
    psychology: number;
};

export type Knowledge = {
    anatomy: number;
    artistic: number;
    astronomy: number;
    biology: number;
    cultural: number;
    geography: number;
    warfare: number;
    history: number;
    linguistics: number;
    magic: number;
    mysticism: number;
    technology: number;
};

export type Intellect = {
    knowledge: Knowledge;
    concentration: number;
    deduction: number;
    memory: number;
    observation: number;
};

export type Craft = {
    visualArts: number;
    chemistry: number;
    construction: number;
    cooking: number;
    explosives: number;
    forging: number;
    medicine: number;
    music: number;
};

export type Magic = {
    alchemy: number;
    enhancement: number;
    annihilation: number;
    conjuration: number;
    elementarism: number;
    enchantment: number;
    illusionism: number;
    summoning: number;
    necromancy: number;
    perception: number;
    sealing: number;
    witchcraft: number;
    absorption: number;
};

export type Competencies = {
    ranged: RangedWeapons;
    artillery: Artillery;
    melee: MeleeWeapons;
    protective: Protective;
    movement: Movement;
    resistance: Resistance;
    survival: Survival;
    social: Social;
    intellect: Intellect;
    craft: Craft;
    magic: Magic;
};

export type Inventory = {
    weight: number;
    contents: string[];
};

export type Religion = {
    god: string;
    devotion: number;
};

export type CharacterForm = {
    name: string;
    species: string;
    age: number;
    priority: string;
    attributes: Attributes;
    role: string;
    competencies: Competencies;
    mana: number;
    languages: string[];
    totemAnimals: string[];
    religions: Religion[];
    animals: string[];
    inventory: Inventory;
    currency: number;
};
