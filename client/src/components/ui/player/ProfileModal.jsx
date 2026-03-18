import { useState } from 'react';
import { FiRefreshCcw } from "react-icons/fi";

import useUserInfo from "@hooks/user/useUserInfo";
import useChangeName from '@hooks/user/useChangeName'
import useToastForm  from '@hooks/toast/useToastForm';

import ToastForm from '@components/form/ToastForm'
import ProfileModalForm from '@components/form/ProfileModalForm';
import Button from '@ui/base/Button';
import GameInput from '@ui/game/GameInput';

export default function ProfileModal({ isModalOpen, setIsModalOpen }){
	const { user } = useUserInfo({ enabled:false });
	const { changeNickname, loading, error, success } = useChangeName();
	const [onInput, setOnInput] = useState(null);
	const [nickname, setNickname] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		changeNickname(nickname);
		setOnInput(false);
		setNickname("");
	};

	useToastForm(success ? '새로고침(F5)시 변경 사항이 즉시 적용됩니다.' : error, { duration: 5000, type: success ? 'info' : 'error' }, !onInput);

    return (
		<ProfileModalForm
			isOpen={isModalOpen}
			onClose={() => {
				setIsModalOpen(false);
				setOnInput(false);
				setNickname("");
			}}
			title='Player Info'
			className="text-xl"
		>
			<ToastForm />
			<div className="space-y-4">
				{onInput ? (
					<div className="relative flex justify-center items-center pb-3">
						<form onSubmit={handleSubmit} className="flex items-center gap-2">
							<GameInput
								type="text"
								disabled={loading}
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
								placeholder="변경할 닉네임 입력"
								className="text-center"
								autoFocus
							/>
							<Button type="submit" disabled={loading} variant="ghost" className="rounded-lg px-1 py-0 hover:scale-[1.2]">
								✓
							</Button>
							<Button type="button" disabled={loading} variant="ghost" className="rounded-lg px-1 py-0 hover:scale-[1.2]"
								onClick={() => {
									setOnInput(false);
									setNickname("");
								}}
							>
								✕
							</Button>
						</form>
					</div>
				) : (
					<div className="relative flex justify-center items-center pb-3">
						<div className="text-lg font-bold text-gray-800">
							닉네임: {user.nickname}
						</div>
						<Button 
							variant='ghost' 
							className="absolute right-0 rounded-lg mr-2 mb-3 pb-1 pl-1 pr-1 pt-1 hover:scale-[1.12]"
							onClick={()=>{setOnInput(true)}}
							>
							<FiRefreshCcw />
						</Button>
					</div>
				)}

				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-lg bg-gray-100 px-3 py-2">
						<p className="text-xs text-gray-500">Wins</p>
						<p className="text-lg font-semibold text-gray-800">{user.wins}</p>
					</div>

					<div className="rounded-lg bg-gray-100 px-3 py-2">
						<p className="text-xs text-gray-500">Losses</p>
						<p className="text-lg font-semibold text-gray-800">{user.losses}</p>
					</div>

					<div className="rounded-lg bg-gray-100 px-3 py-2">
						<p className="text-xs text-gray-500">Rating</p>
						<p className="text-lg font-semibold text-gray-800">{user.rating}</p>
					</div>

					<div className="rounded-lg bg-gray-100 px-3 py-2">
						<p className="text-xs text-gray-500">Level</p>
						<p className="text-lg font-semibold text-gray-800">{user.level}</p>
					</div>
				</div>
			</div>
		</ProfileModalForm>
	)
}