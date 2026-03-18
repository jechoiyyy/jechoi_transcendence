import { useEffect } from "react";

import { useUser } from "@contexts/UserContext";

import userService from "@api/user.api";

export default function useUserInfo({ enabled = true } = {}) {
	const { user, setUser } = useUser();

    useEffect(() => {
        if (!enabled) return;
        const fetchUser = async () => {
            try {
				const response = await userService.getCurrentUser();
				setUser(response);
            } catch (e) {
                setUser(null);
                return;
            }
        };

        fetchUser();
    }, []);

    return { user, setUser };
}
