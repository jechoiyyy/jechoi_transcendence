import { disconnectSocket } from "@socket/socket";

import api from "@api/base.api";

const signup = async (userData) => {
    const response = await api.post(`/auth/signup`, userData);
    return response.data;
};

const emailauth = async (userData) => {
    const response = await api.post(`/auth/emailauth`, userData);
    return response.data;
};

const login = async (userData) => {
    const response = await api.post(`/auth/login`, userData);
    return response.data;
};

const logout = async () => {
	disconnectSocket();
    await api.post(`/auth/logout`);
};

const authService = {
    signup,
    login,
    logout,
    emailauth,
};

export default authService;