import React from 'react';
import { createPortal } from 'react-dom';

const DifficultyLevelModal = props => {
  return createPortal(
    <div className="absolute inset-0">
      <div className="absolute inset-x-0 inset-y-[15vh] z-10 sm:inset-y-[30vh]">
        <h1 className="mb-6 text-center text-7xl text-orange-500">
          Pick Difficulty Level
        </h1>
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
          <button
            onClick={() => props.onChoose(4)}
            className="text-4xl text-orange-300 hover:text-orange-100"
          >
            Easy
          </button>
          <button
            onClick={() => props.onChoose(6)}
            className="text-4xl text-orange-300 hover:text-orange-100"
          >
            Hard
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-[rgb(0,0,0,0.5)]"></div>
    </div>,
    document.body
  );
};

export default DifficultyLevelModal;
