import React, { Navigate } from 'react';

import useUserInfo from "@hooks/user/useUserInfo";

import truncate from '@utils/trim';

import PlayerInfoButton from '@ui/player/PlayerInfoButton'

export default function PlayerInfoForm({ setIsModalOpen }){
	const { user } = useUserInfo();
	
	return (
		<div className="bg-white/90 backdrop-blur-md pt-4 p-6 rounded-2xl shadow-xl border border-white/50">
			<PlayerInfoButton 
				setIsModalOpen={setIsModalOpen}
			/>
			{user ? (
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
						{(user.nickname ?? "N").charAt(0).toUpperCase()}
					</div>

					<div className="flex-1">
						<div className="flex items-center gap-3 mb-1">
							<div className="font-bold text-gray-800 text-lg">
								{truncate((user.nickname ?? "None"), 10)}
							</div>
							<span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
								⭐ Lv {user.level ?? 1}
							</span>
						</div>
						<div className="flex flex-wrap gap-3 text-sm">
							<span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
								🏆 {user.rating ?? 0}
							</span>
							<span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
								✔️ {user.wins ?? 0}%
							</span>
						</div>
					</div>
				</div>
			) : (
				<div>
					<Navigate to="/login" replace />
				</div>
			)}
		</div>
	);
}