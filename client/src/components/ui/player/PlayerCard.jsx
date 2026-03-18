import React from 'react';

const PlayerCard = ({ player }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
            <div>
                <h2 className="text-lg font-semibold">{player?.nickname}</h2>
                <p className="text-sm text-gray-600 font-semibold">Rating: {player?.rating}</p>
                <p className="text-sm text-gray-600 font-semibold">Games Played: {player?.gamesPlayed}</p>
            </div>
        </div>
    );
};

export default PlayerCard;