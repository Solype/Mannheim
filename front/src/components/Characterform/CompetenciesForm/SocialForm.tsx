import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Social } from '@/types/character_types';

export const SocialForm = ({ social, setSocial }: { social: Social, setSocial: (c: Social) => void }) => {
    return (
        <div>
            <h3>Sociale</h3>
            <Label>Dressage</Label>
            <Input type="number" value={social.taming} onChange={(e) => setSocial({ ...social, taming: Number(e.target.value) } )} />

            <Label>Imposture</Label>
            <Input type="number" value={social.deceit} onChange={(e) => setSocial({ ...social, deceit: Number(e.target.value) })} />

            <Label>Intimidation</Label>
            <Input type="number" value={social.intimidation} onChange={(e) => setSocial({ ...social, intimidation: Number(e.target.value) })} />

            <Label>Parole</Label>
            <Input type="number" value={social.speech} onChange={(e) => setSocial({ ...social, speech: Number(e.target.value) })} />

            <Label>Persuasion</Label>
            <Input type="number" value={social.persuasion} onChange={(e) => setSocial({ ...social, persuasion: Number(e.target.value) })} />

            <Label>Psychologie</Label>
            <Input type="number" value={social.psychology} onChange={(e) => setSocial({ ...social, psychology: Number(e.target.value) })} />
        </div>
    );
};
