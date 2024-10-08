// import React, { useState, ChangeEvent } from 'react';

// interface NumberInputPopupProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSubmit: (data: { operator: string; value: number }) => void;
// }

// const NumberInputPopup: React.FC<NumberInputPopupProps> = ({ isOpen, onClose, onSubmit }) => {
//     const [numberValue, setNumberValue] = useState<string>('');
//     const [operator, setOperator] = useState<string>('+'); // État pour l'opérateur du menu déroulant

//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value;
//         // Vérifie si la valeur est un nombre entier
//         if (/^\d*$/.test(value)) {
//             setNumberValue(value);
//         }
//     };

//     const handleSubmit = () => {
//         // Soumettre la valeur si elle est valide
//         if (numberValue.trim() !== '') {
//             onSubmit({
//                 operator: operator,
//                 value: parseInt(numberValue, 10)
//             });
//             setNumberValue('');
//         }
//     };

//     const handleOperatorChange = (event: ChangeEvent<HTMLSelectElement>) => {
//         setOperator(event.target.value);
//     };

//     if (!isOpen) {
//         return null;
//     }

//     return (
//         <div className={`fixed inset-0 flex items-center justify-center z-50`}>
//             <div className="p-8 rounded-lg shadow-md bg-white dark:bg-gray-800">
//                 <h2 className="text-xl font-semibold mb-4">Sélectionner un nombre</h2>
//                 <div className="flex mb-4">
//                     <select
//                         className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         value={operator}
//                         onChange={handleOperatorChange}>
//                         <option value="+">+</option>
//                         <option value="-">-</option>
//                         <option value="=">=</option>
//                     </select>
//                     <input
//                         type="text"
//                         className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Entrez un nombre"
//                         value={numberValue}
//                         onChange={handleChange}/>
//                 </div>
//                 <div className="flex justify-between">
//                     <button
//                         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         onClick={handleSubmit}>
//                         Soumettre
//                     </button>
//                     <button
//                         className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
//                         onClick={onClose}>
//                         Annuler
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NumberInputPopup;
