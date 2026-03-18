import React from 'react';

const GameItem = ({ rank, suit }) => {
    return (
    <div className="inline-flex items-center justify-center w-12 h-16 rounded-md bg-white shadow-sm border text-sm font-medium">
      <div className="text-center">
        <div>{rank}</div>
        <div className="text-xs text-gray-400">{suit}</div>
      </div>
    </div>
  );
};

export default GameItem;
