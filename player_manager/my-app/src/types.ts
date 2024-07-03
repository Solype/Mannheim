export interface HealthData {
    name: string;
    file: string;
    "physical health": [number, number];
    "mental health": [number, number];
    "endurance health": [number, number];
    "pathological health": [number, number];
    mana: [number, number];
}