// components/MinusButton.js
import React from 'react';

const MinusButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      onClick={onClick} // Appel de la fonction onClick passée en prop
    >
      <span className="text-xl">-</span>
    </button>
  );
};

export default MinusButton;
