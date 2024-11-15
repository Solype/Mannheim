import { Inventory } from './types';

export const InventoryForm = ({ inventory, setInventory }: { inventory: Inventory, setInventory: (i: Inventory) => void }) => {
    return (
        <div>
            <h2>Inventory</h2>
            <label>Weight (kg)</label>
            <input type="number" value={inventory.weight} onChange={(e) => setInventory({ ...inventory, weight: Number(e.target.value) })} />
            
            <label>Contents</label>
            <textarea value={inventory.contents.join(', ')} onChange={(e) => setInventory({ ...inventory, contents: e.target.value.split(', ') })}></textarea>
        </div>
    );
};
