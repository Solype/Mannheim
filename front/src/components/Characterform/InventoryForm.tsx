import { Inventory } from '@/types/types';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export const InventoryForm = ({ inventory, setInventory }: { inventory: Inventory, setInventory: (i: Inventory) => void }) => {
    return (
        <div>
            <h2>Inventaire</h2>
            <Label>Poids (kg)</Label>
            <Input type="number" value={inventory.weight} onChange={(e) => setInventory({ ...inventory, weight: Number(e.target.value) })} />
            
            <Label>Contenu</Label>
            <Textarea placeholder={"Ecrit le contenu de l'inventaire en séparant par des virgules"} value={inventory.contents.join(', ')} onChange={(e) => setInventory({ ...inventory, contents: e.target.value.split(', ') })} />
        </div>
    );
};
