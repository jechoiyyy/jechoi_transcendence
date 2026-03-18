import React from 'react';

const GameBoard = () => {
    return (
    <div className="w-full h-[420px] bg-gradient-to-br from-white/60 to-white/30 rounded-lg border border-gray-100 p-4 flex items-center justify-center">
        <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 mb-2">Game Table</div>
        <div className="text-sm text-gray-600">블랙잭 / 4-Card 등 카드 게임 플레이 영역 (미구현 플레이 로직)</div>
        <div className="mt-4 text-gray-500">게임 시작 시 여기에 카드 UI가 표시됩니다.</div>
        </div>
    </div>
    );
};

export default GameBoard;