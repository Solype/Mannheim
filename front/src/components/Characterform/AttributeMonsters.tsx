import { useState, useEffect } from "react";
import { Attributes } from "@/types/character_types";
import { dico } from "@/types/dico";

interface AttributesFormProps {
    attributes: Attributes;
    setter: (attributes: Attributes) => void;
    disabled: boolean;
}

export default function AttributesFormMonster({ attributes, setter, disabled }: AttributesFormProps) {
    const [removedAttributes, setRemovedAttributes] = useState<string[]>([]);
    const [selectedAttribute, setSelectedAttribute] = useState<string>("");
    const attributesCompulsories = ["resistance", "strength", "vivacity", "dexterity"];
    const allAttributes = [...attributesCompulsories, "agility", "intellect", "social", "magic"];

    useEffect(() => {
        console.log(attributes);
        const attributes_removed : string[] = [];
        const attributes_list = Object.entries(attributes);
        attributes_list.forEach((attribute) => {
            console.log(attribute, attribute[1], attribute[1] === null);
            if (attribute[1] === null) {
                console.log(attribute[0]);
                attributes_removed.push(attribute[0]);
                console.log(attributes_removed);
            }
        })
        console.log(attributes_removed);
        allAttributes.map((attribute) => {
            console.log(attribute);
            const hasFound = attributes_list.find((attr) => {console.log(attr); return attr[0] === attribute})
            if (hasFound === undefined) {
                attributes_removed.push(attribute);
            }
            console.log(hasFound);
        })
        setRemovedAttributes(attributes_removed);
    }, [attributes]);

    const onRoleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setter({ ...attributes, [e.target.name]: Number(e.target.value) });
    };

    const onRemoveAttribute = (attribute: string) => {
        const updatedAttributes = { ...attributes };
        delete updatedAttributes[attribute];
        setter(updatedAttributes);
        setRemovedAttributes([...removedAttributes, attribute]);
    };

    const onRestoreAttribute = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const restoredAttribute = e.target.value;
        if (restoredAttribute) {
            setRemovedAttributes(removedAttributes.filter(attr => attr !== restoredAttribute));
            setter({ ...attributes, [restoredAttribute]: 0 });
            setSelectedAttribute("");
        }
    };

    return (
        <div className="space-y-1 bg-white bg-opacity-80 p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 self-center mb-5">Attributs</h2>
            {removedAttributes.length > 0 && (
                <div className="mt-4">
                    <label htmlFor="restoreAttribute" className="font-semibold text-gray-700">
                        Restaurer un attribut supprimé :
                    </label>
                    <select
                        id="restoreAttribute"
                        value={selectedAttribute}
                        disabled={disabled}
                        onChange={(e) => {
                            setSelectedAttribute(e.target.value);
                            onRestoreAttribute(e);
                        }}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        <option value="" disabled>Choisissez un attribut</option>
                        {removedAttributes.map((attribute) => (
                            <option key={attribute} value={attribute}>
                                {dico[attribute] ?? attribute}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {Object.entries(attributes).map(([attribute, value]) => (
                attribute && value != null && (
                    <div className="grid grid-cols-6 gap-2" key={attribute}>
                        <div key={attribute} className="flex justify-between items-center col-span-5">
                            <label htmlFor={attribute} className="font-semibold text-gray-700 capitalize">
                                {dico[attribute] ?? attribute}
                            </label>
                            <input
                                id={attribute}
                                name={attribute}
                                type="number"
                                value={value}
                                onChange={onRoleValueChange}
                                className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                disabled={disabled}
                            />
                        </div>
                            {!disabled && !attributesCompulsories.includes(attribute) && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveAttribute(attribute)}
                                    className="text-red-500 hover:text-red-700 ml-2 col-span-1"
                                    disabled={disabled}
                                >
                                    X
                                </button>
                            )}
                    </div>
                )
            ))}
        </div>
    );
}
