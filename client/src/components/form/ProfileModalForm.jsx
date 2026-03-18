import React from 'react';

import GameButton from '@ui/game/GameButton'

export default function ProfileModalForm({ isOpen, onClose, title, children })
{
	if (!isOpen) return null;

		return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 backdrop-blur-sm"/>
			<div className="
				relative z-10 w-full max-w-sm p-6
				rounded-2xl
				bg-white/50 backdrop-blur-md
				shadow-2xl
				border border-white/30
				animate-fade-in
			">
				<h2 className="text-2xl flex justify-center font-semibold mb-4 text-gray-800 pb-4">
					{title}
				</h2>
				<div className="mb-6 text-gray-700">
					{children}
				</div>
				<GameButton
					className="w-full font-semibold px-4 py-2"
					onClick={onClose}
					variant="soft"
				>
					Close
				</GameButton>
			</div>
		</div>
	);
};
