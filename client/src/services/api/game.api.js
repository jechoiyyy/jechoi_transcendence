import api from "@api/base.api";

const getGameRooms = async (page = 1, size = 4) =>{
    const response = await api.get("/games/page", {
        params: { page, size },
    });
    return response.data;
}

const createGame = async (payload) => {
    const response = await api.post("/games/create", payload);
    return response.data;
}

const enterGame = async (payload) => {
    const response = await api.post("/games/enter", payload);
    return response.data;
}

const gameService = {
    createGame,
    enterGame,
    getGameRooms,
};

export default gameService;