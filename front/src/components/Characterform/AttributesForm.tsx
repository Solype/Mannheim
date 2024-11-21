import { Attributes } from "@/types/character_types";

interface AttributesFormProps {
    attributes: Attributes;
    setter: (attributes: Attributes) => void;
}

export default function AttributesForm({ attributes, setter }: AttributesFormProps) {
    const onRoleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setter({ ...attributes, [e.target.name]: Number(e.target.value) });
    };

    return (
        <div className="">
            {Object.entries(attributes).map(([attribute, value]) => (
                attribute && <>
                    <div key={attribute} className="">
                        <label htmlFor={attribute} className="font-semibold text-gray-700 capitalize">
                            {attribute}
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
