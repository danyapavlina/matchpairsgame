import React from 'react';
import { createPortal } from 'react-dom';

const WinModal = props => {
  return createPortal(
    <div className="cursor-pointer" onClick={props.onClick}>
      <div className="absolute inset-0 z-10 mx-auto mt-[30vh]">
        <h1 className="mb-4 text-center text-7xl text-orange-500">You Won!</h1>
        <h1 className="text-center text-4xl text-orange-300">Tap to restart</h1>
      </div>
      <div className="absolute inset-0 bg-[rgb(0,0,0,0.5)]"></div>
    </div>,
    document.body
  );
};

export default WinModal;
