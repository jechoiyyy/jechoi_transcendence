import api from "@api/base.api";

const getCurrentUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
}

const getOnlineUsers = async() => {
  const response = await api.get("/user/online");
  return response.data;
}

const changeNicknameUsers = async(userData) => {
  const response = await api.post("/user/change_nickname", userData);
  return response.data;
}

const userService = {
    getCurrentUser,
    getOnlineUsers,
    changeNicknameUsers,
};

export default userService;