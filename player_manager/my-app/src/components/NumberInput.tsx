// components/NumberInputPopup.js
import React, { useState } from 'react';

const NumberInputPopup = ({ isOpen, onClose, onSubmit }) => {
  const [numberValue, setNumberValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    // Vérifie si la valeur est un nombre entier
    if (/^\d*$/.test(value)) {
      setNumberValue(value);
    }
  };

  const handleSubmit = () => {
    // Soumettre la valeur si elle est valide
    if (numberValue.trim() !== '') {
      onSubmit(parseInt(numberValue, 10));
      setNumberValue('');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Entrer un nombre</h2>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez un nombre"
          value={numberValue}
          onChange={handleChange}
        />
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}
          >
            Soumettre
          </button>
          <button
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInputPopup;
