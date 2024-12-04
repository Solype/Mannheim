import { useState } from "react";
import { Priority } from "@/types/character_types";
import { dico } from "@/types/dico";

interface PriorityFormProps {
    initialPriority?: Priority;
    onSubmit: (priority: Priority) => void;
}

const PriorityForm = ({ initialPriority, onSubmit }: PriorityFormProps) => {
    const [priority, setPriority] = useState<Priority>(
        initialPriority || { role: "A", attribute: "A", skills: "A", money: "A" }
    );

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPriority({ ...priority, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(priority);
    };

    const options = ["A", "B", "C", "D", "E"];

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-opacity-80  bg-white p-6 rounded-lg shadow-md max-w-md flex flex-col items-center w-52">
            <h2 className="text-lg font-bold text-gray-800">Choisir les Priorités</h2>

            {Object.entries(priority).map(([key, value]) => (
                <div key={key} className="flex flex-col space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">{dico[key] ?? key}</label>
                    <select
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {/* <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
                Submit
            </button> */}
        </form>
    );
};

export default PriorityForm;
