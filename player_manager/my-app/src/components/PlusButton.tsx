import React from 'react';

const PlusButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={onClick} // Appel de la fonction onClick passée en prop
    >
      <span className="text-xl">+</span>
    </button>
  );
};

export default PlusButton;
