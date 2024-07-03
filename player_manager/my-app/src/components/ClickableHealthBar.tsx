import React, { useState } from 'react';
import HealthBar from './HeathBar';
import NumberInputPopup from './NumberInput';

const ClickableHealthBar = ({ current, max, onUpdateCurrent }) => {
  const [isNumberInputOpen, setNumberInputOpen] = useState(false);

  const openNumberInput = () => {
    setNumberInputOpen(true);
  };

  const closeNumberInput = () => {
    setNumberInputOpen(false);
  };

  const handleNumberSubmit = ({ operator, value }) => {
    const newCurrent = operator === '+' ? current + value : operator === '-' ? current - value : value;
    if (onUpdateCurrent !== null) {
        onUpdateCurrent(newCurrent); // Met à jour le current dans le parent (envoi au serveur)
    }
    closeNumberInput();
  };

  return (
    <>
      <div onClick={openNumberInput} className="cursor-pointer">
        <HealthBar current={current} max={max} />
      </div>
      <NumberInputPopup isOpen={isNumberInputOpen} onClose={closeNumberInput} onSubmit={handleNumberSubmit} />
    </>
  );
};

export default ClickableHealthBar;
