import { useState } from 'react';

import { navigationRef } from "@utils/navigation";
import useEnterGame from "@hooks/game/useEnterGame"

import useCreateGame from '@hooks/game/useCreateGame'

import Button from '@ui/base/Button';
import GameInput from '@ui/game/GameInput';
import Checkbox from '@ui/base/Checkbox';

export default function CreateRoomModal({ isModalOpen, setIsModalOpen }){
	const { createGame, loading, error, setError } = useCreateGame();
	const [roomName, setRoomName] = useState("");
	const [hasPassword, setHasPassword] = useState(false);
	const [password, setPassword] = useState("");

	const { enterGameResult } = useEnterGame(
		() => navigationRef.navigate("/games", {
			state: { from: "home" }
		}
	));

	const resetForm = () => {
		setRoomName("");
		setHasPassword(false);
		setPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await createGame({ roomName, hasPassword, password });
		const pass = password;
		resetForm();
		if (response)
		{
			setIsModalOpen(false);
        	enterGameResult({ roomId: response.roomId, passwordInput: pass });
		}
	};

	if (!isModalOpen) return null;
	
	return (
		<div>
			<div className="fixed inset-0 z-50 flex items-center justify-center">	
				<div 
					className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 backdrop-blur-sm"
					onClick={() => {
						resetForm()
						setIsModalOpen(false);
					}}
				/>
				<div className="
					relative z-10 w-full max-w-sm p-6
					rounded-2xl
					bg-white/50 backdrop-blur-md
					shadow-2xl
					border border-white/30
					animate-fade-in
				">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-semibold text-gray-800">
							방 생성
						</h2>
						<Button 
							type="button" 
							variant="ghost" 
							className="rounded-lg px-2 py-1 hover:scale-[1.2] transition-transform"
							onClick={() => {
								resetForm()
								setIsModalOpen(false);
								setError("");
							}}
						>
							✕
						</Button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								방 제목
							</label>
							<GameInput
								type="text"
								autoComplete="title"
								disabled={loading}
								value={roomName}
								onChange={(e) => setRoomName(e.target.value)}
								placeholder="방 제목을 입력하세요"
								className="w-full"
								autoFocus
								required
							/>
						</div>
						<div className="h-5">
							{error && <div className="text-sm text-red-500">{error}</div>}
						</div>
						<div>
							<Checkbox
								label="비밀번호 설정"
								checked={hasPassword}
								onChange={(e) => {
									setHasPassword(e.target.checked);
									if (!e.target.checked) {
										setPassword("");
									}
								}}
							/>
						</div>

						{hasPassword && (
							<div className="animate-fade-in">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									비밀번호
								</label>
								<GameInput
									type="password"
									autoComplete="off"
									disabled={loading}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="비밀번호를 입력하세요"
									className="w-full"
									required={hasPassword}
								/>
							</div>
						)}

						<div className="flex gap-2 pt-4">
							<Button
								type="button"
								variant="ghost"
								onClick={() => {
									resetForm()
									setIsModalOpen(false);
									setError("");
								}}
								disabled={loading}
								className="flex-1"
							>
								취소
							</Button>
							<Button
								type="submit"
								disabled={loading || !roomName.trim() || (hasPassword && !password.trim())}
								className="flex-1"
							>
								{loading ? "생성 중..." : "생성"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}