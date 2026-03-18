import { useState } from "react";

import gameService from "@api/game.api";

export default function useCreateGame() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	async function createGame({ roomName, hasPassword, password }) {

		roomName = roomName.trim();
		password = password.trim();
		setError(null);

		if (!roomName) {
			setError("방 제목을 입력하세요.");
			return false;
		}
		if (roomName.length < 2 || roomName.length > 20) {
			setError("방 제목은 2자 이상 20자 이하여야 합니다.");
			return false;
		}
		if (password.length > 0 && (password.length < 2 || password.length > 20)) {
			setError("비밀번호는 2자 이상 20자 이하여야 합니다.");
			return false;
		}

		const data = {
			roomName,
			...(hasPassword && password && { password })
		};
		setLoading(true);
		try {
			const response = await gameService.createGame(data);
			return response;
		} catch (err) {
  			setError(err.message ?? err.error ?? "error");
		} finally {
			setLoading(false);
		}
		return false;
	};

	return { createGame, loading, error, setError };
};
