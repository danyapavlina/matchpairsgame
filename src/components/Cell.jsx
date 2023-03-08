import React from 'react';

const Cell = props => {
  return (
    <div
      id={props.id}
      onClick={() => props.onTurn(props.id)}
      className={`relative transition-[200ms] [transform-style:preserve-3d] ${
        props.isTurned ? '' : '[transform:rotateY(180deg)]'
      }`}
    >
      <img
        src={props.src}
        className="absolute h-full w-full rounded-lg bg-orange-400 [backface-visibility:hidden]"
      />
      <div className="absolute h-full w-full rounded-lg bg-orange-500 transition-all [transform:rotateY(180deg)] [backface-visibility:hidden]"></div>
    </div>
  );
};

export default Cell;
