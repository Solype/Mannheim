import { Competencies } from '@/types/types';
import { RangedForm } from './CompetenciesForm/RangedForm';
import { ArtilleryForm } from './CompetenciesForm/ArtilleryForm';
import { MeleeForm } from './CompetenciesForm/MeleeForm';
import { ProtectiveForm } from './CompetenciesForm/ProtectiveForm';
import { MovementForm } from './CompetenciesForm/MovementForm';
import { ResistanceForm } from './CompetenciesForm/ResistanceForm';
import { SurvivalForm } from './CompetenciesForm/SurvivalForm';
import { SocialForm } from './CompetenciesForm/SocialForm';
import { IntellectForm } from './CompetenciesForm/IntellectForm';
import { CraftForm } from './CompetenciesForm/CraftForm';
import { MagicForm } from './CompetenciesForm/MagicForm';

export const CompetenciesForm = ({ competencies, setCompetencies }: { competencies: Competencies, setCompetencies: (c: Competencies) => void }) => {
    return (
        <div>
            <h2>Compétences</h2>
            <h3>Combat</h3>

            <RangedForm ranged={competencies.ranged} setRanged={(r) => setCompetencies({ ...competencies, ranged: r })} />

            <ArtilleryForm artillery={competencies.artillery} setArtillery={(a) => setCompetencies({ ...competencies, artillery: a })} />

            <MeleeForm melee={competencies.melee} setMelee={(m) => setCompetencies({ ...competencies, melee: m })} />

            <ProtectiveForm protective={competencies.protective} setProtective={(p) => setCompetencies({ ...competencies, protective: p })} />

            <MovementForm movement={competencies.movement} setMovement={(m) => setCompetencies({ ...competencies, movement: m })} />

            <ResistanceForm resistance={competencies.resistance} setResistance={(r) => setCompetencies({ ...competencies, resistance: r })} />

            <SurvivalForm survival={competencies.survival} setSurvival={(s) => setCompetencies({ ...competencies, survival: s })} />

            <SocialForm social={competencies.social} setSocial={(s) => setCompetencies({ ...competencies, social: s })} />

            <IntellectForm intellect={competencies.intellect} setIntellect={(i) => setCompetencies({ ...competencies, intellect: i })} />

            <CraftForm craft={competencies.craft} setCraft={(c) => setCompetencies({ ...competencies, craft: c })} />

            <MagicForm magic={competencies.magic} setMagic={(m) => setCompetencies({ ...competencies, magic: m })} />
        </div>
    );
};
