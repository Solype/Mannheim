// src/app/page.tsx
"use client";

import React, { useState } from 'react';

import Card from "../components/Card";
import SimpleCharCard from "../components/SimpleCharCard";
import MinusButton from "../components/MinusButton";
import PlusButton from "../components/PlusButton";
import NumberInputPopup from "../components/NumberInput";

export default function Home() {
  const [isNumberInputOpen, setNumberInputOpen] = useState(false); // État pour gérer l'ouverture du popup

  const openNumberInput = () => {
    setNumberInputOpen(true);
  };

  const closeNumberInput = () => {
    setNumberInputOpen(false);
  };

  const handleNumberSubmit = (value) => {
    console.log('Submitted number:', value);
    closeNumberInput();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left gap-x-4 gap-y-4">
        <SimpleCharCard name="test"
          cur_mana={10} max_mana={10} cur_phys={10} max_phys={10} cur_mental={10} max_mental={10} cur_stamina={10} max_stamina={10} cur_path={10} max_path={10}
          />
        <SimpleCharCard name="test"
          cur_mana={10} max_mana={100} cur_phys={10} max_phys={10} cur_mental={10} max_mental={10} cur_stamina={10} max_stamina={10} cur_path={10} max_path={10}
          />
        <MinusButton onClick={openNumberInput}/>
      </div>
      <NumberInputPopup isOpen={isNumberInputOpen} onClose={closeNumberInput} onSubmit={handleNumberSubmit} />
    </main>
  );
}
