import { useState } from "react";

interface ListStringFormProps {
    title: string;
    listString: string[];
    setter: (roles: string[]) => void;
    disabled: boolean;
}

const ListStringForm = ({ title, listString, setter, disabled }: ListStringFormProps) => {
    const [inputValue, setInputValue] = useState("");

    const addRole = () => {
        if (inputValue.trim() === "") return;

        setter([...listString, inputValue]);
        setInputValue("");
    };

    const removeRole = (index: number) => {
        const updatedRoles = listString.filter((_, i) => i !== index);
        setter(updatedRoles);
    };

    return (
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Entrez un rôle"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    disabled={disabled}
                />
                {!disabled && (
                    <button
                        onClick={addRole}
                        className="px-4 py-2 text-white bg-light_foret rounded-lg hover:bg-foret focus:outline-none"
                    >
                        Ajouter
                    </button>
                )}
            </div>

            <ul className="space-y-2">
                {listString.map((role, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
                    >
                        <span>{role}</span>
                        {!disabled && (
                            <button
                                onClick={() => removeRole(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Supprimer
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListStringForm;
