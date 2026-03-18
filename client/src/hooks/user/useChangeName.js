import { useState } from 'react';

import useUserInfo from "@hooks/user/useUserInfo";

import userService from "@api/user.api";

export default function useChangeName() {
	const { setUser } = useUserInfo({ enabled:false });
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);
	
	async function changeNickname(nickname) {
		const regex = /^[a-zA-Z0-9_가-힣]+$/i;

		setError(null);
		setSuccess(false);
		if (nickname.length < 2)
			return setError('닉네임이 2자 이상이어야합니다.');
		else if (nickname.length > 14)
			return setError('닉네임이 14자 이하여야합니다.');
		else if (!regex.test(nickname))
			return setError('닉네임 형식이 잘못되었습니다. (영어, 한글, 숫자, _)');
		setLoading(true);
		try {
			const response = await userService.changeNicknameUsers({ nickname });
			setUser(response);
			setSuccess(true);
		} catch (e) {
			const code = e.response?.status || 500;
			if (code === 401) {
				setError('토큰이 없습니다.');
			} else if (code === 404) {
				setError('유저 정보를 찾을 수 없습니다.');
			} else if (code === 409) {
				setError('존재하는 닉네임입니다.');
			} else if (code === 403) {
				setError('닉네임 변경에 실패했습니다.');
			} else {
				setError("오류가 발생했습니다.");
			}
		} finally {
			setLoading(false);
		}
	};

	return { changeNickname, loading, error, success };
}