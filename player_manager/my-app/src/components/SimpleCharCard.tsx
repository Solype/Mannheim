// components/Card.js
import React from 'react';
import HealthBar from './HeathBar';

const SimpleCharCard = ({ name, cur_mana, max_mana, cur_phys, max_phys, cur_mental, max_mental, cur_stamina, max_stamina, cur_path, max_path }) => {
  return (
    <a
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 border-gray-400"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {name}
      </h2>
      <div className="space-y-2">
        <div>
          <p className="text-xs font-medium mb-1">Mana</p>
          <HealthBar current={cur_mana} max={max_mana} />
        </div>
        <div>
          <p className="text-xs font-medium mb-1">Physique</p>
          <HealthBar current={cur_phys} max={max_phys} />
        </div>
        <div>
          <p className="text-xs font-medium mb-1">Mental</p>
          <HealthBar current={cur_mental} max={max_mental} />
        </div>
        <div>
          <p className="text-xs font-medium mb-1">Stamina</p>
          <HealthBar current={cur_stamina} max={max_stamina} />
        </div>
        <div>
          <p className="text-xs font-medium mb-1">Pathologique</p>
          <HealthBar current={cur_path} max={max_path} />
        </div>
      </div>
    </a>
  );
};

export default SimpleCharCard;
