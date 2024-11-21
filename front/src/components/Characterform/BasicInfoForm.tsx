import { CharacterBasicInfo } from "@/types/character_types";

interface BasicFormProps {
    formData: CharacterBasicInfo;
    setFormData: (formData: CharacterBasicInfo) => void;
}

const BasicForm = ({ formData, setFormData }: BasicFormProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "age" ? Number(value) : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Entrez le nom"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Âge</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Entrez l'âge"
                    min="0"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Espèce</label>
                <input
                    type="text"
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Entrez l'espèce"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Genre</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    required
                >
                    <option value="" disabled>Choisissez le genre</option>
                    <option value="male">Masculin</option>
                    <option value="female">Féminin</option>
                    <option value="other">Autre</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
                Soumettre
            </button>
        </form>
    );
};

export default BasicForm;
