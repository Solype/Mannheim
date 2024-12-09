import { useState } from "react";
import { Priority } from "@/types/character_types";
import { dico } from "@/types/dico";

interface PriorityFormProps {
    initialPriority?: Priority;
    onSubmit: (priority: Priority) => void;
    disabled: boolean;
}

const PriorityForm = ({ initialPriority, onSubmit, disabled }: PriorityFormProps) => {
    const [priority, setPriority] = useState<Priority>(
        initialPriority ?? { role: "A", attribute: "A", skills: "A", money: "A" }
    );

    console.log(priority);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPriority({ ...priority, [name]: value });
        onSubmit({ ...priority, [name]: value });
    };

    const options = ["A", "B", "C", "D", "E"];

    return (
        <form className="space-y-4 bg-white bg-opacity-80 p-7 rounded-lg shadow-md flex flex-col ">
            <h2 className="text-lg font-bold text-gray-800 self-center">Priorités</h2>

            {Object.entries(priority).map(([key, value]) => (
                <div key={key} >
                    <label className="block text-sm font-medium text-gray-700 ">{dico[key] ?? key}</label>
                    <select
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-foret focus:outline-none"
                        disabled={disabled}
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
