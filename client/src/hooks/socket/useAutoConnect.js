import { useEffect, useState } from "react";

import { getSocket, connectSocket, disconnectSocket } from "@socket/socket";

import useUserInfo from "@hooks/user/useUserInfo";

export default function useAutoConnect() {
	const { user } = useUserInfo({ enabled:false });
    const [socket, setSocket] = useState(null);

	useEffect(() => {
    	let timer;

		if (!user && socket.connected) {
			timer = setTimeout(() => {
				if (!user) {
					disconnectSocket();
				}
			}, 1000);
		}

		if (user && (!socket || !socket.connected)) {
			const s = getSocket() ?? connectSocket();
			setSocket(s);
		}

		return () => {
			clearTimeout(timer);
			if (!user && socket?.connected) {
				disconnectSocket();
			}
		};
	}, [user, socket]);
  
  return { socket };
};

