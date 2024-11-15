import { Social } from '@/types/types';

export const SocialForm = ({ social, setSocial }: { social: Social, setSocial: (c: Social) => void }) => {
    return (
        <div>
            <h3>Sociale</h3>
            <label>Dressage</label>
            <input type="number" value={social.taming} onChange={(e) => setSocial({ ...social, taming: Number(e.target.value) } )} />

            <label>Imposture</label>
            <input type="number" value={social.deceit} onChange={(e) => setSocial({ ...social, deceit: Number(e.target.value) })} />

            <label>Intimidation</label>
            <input type="number" value={social.intimidation} onChange={(e) => setSocial({ ...social, intimidation: Number(e.target.value) })} />

            <label>Parole</label>
            <input type="number" value={social.speech} onChange={(e) => setSocial({ ...social, speech: Number(e.target.value) })} />

            <label>Persuasion</label>
            <input type="number" value={social.persuasion} onChange={(e) => setSocial({ ...social, persuasion: Number(e.target.value) })} />

            <label>Psychologie</label>
            <input type="number" value={social.psychology} onChange={(e) => setSocial({ ...social, psychology: Number(e.target.value) })} />
        </div>
    );
};
