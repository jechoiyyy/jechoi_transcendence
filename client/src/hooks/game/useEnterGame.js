import { useState } from "react";

import gameService from "@api/game.api";

export default function useEnterGame(onSuccess) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const enterGameResult = async ({ roomId, passwordInput }) => {
		setLoading(true);
		setError(null);
		try {
			await gameService.enterGame({ roomId, passwordInput });
			onSuccess();
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}
	return { enterGameResult, loading, error };
};