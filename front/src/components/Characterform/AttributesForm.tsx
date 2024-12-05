import { Attributes } from "@/types/character_types";
import { dico } from "@/types/dico";

interface AttributesFormProps {
    attributes: Attributes;
    setter: (attributes: Attributes) => void;
}

export default function AttributesForm({ attributes, setter }: AttributesFormProps) {
    const onRoleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setter({ ...attributes, [e.target.name]: Number(e.target.value) });
    };

    return (
        <div className="space-y-1 bg-white bg-opacity-80 p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 self-center mb-5">Attributs</h2>

            {Object.entries(attributes).map(([attribute, value]) => (
                attribute && <>
                    <div key={attribute} className="flex justify-between">
                        <label htmlFor={attribute} className="font-semibold text-gray-700 capitalize">
                            {dico[attribute] ?? attribute}
                        </label>
                        <input
                            id={attribute}
                            name={attribute} // Ajout du name correspondant
                            type="number"
                            value={value}
                            onChange={onRoleValueChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                </>
            ))}
        </div>
    );
}
