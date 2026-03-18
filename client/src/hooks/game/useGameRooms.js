import { useEffect, useState } from "react";

import gameService from "@api/game.api";

export default function useGameRooms(page, pageSize) {
	const [rooms, setRooms] = useState([]);
	const [lengthRooms, setLengthRooms] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	async function fetchRooms() {
		setLoading(true);
		setError(null);
		try {
			const response = await gameService.getGameRooms(page, pageSize);
			setRooms(response.rooms || []);
			setLengthRooms(response.length || 0);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRooms();
	}, [page]);
  
  return { fetchRooms, rooms, lengthRooms, loading, error };
};